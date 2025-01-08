import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './roots/userRoute.js';  // Your user routes
import galleryitemrouter from './roots/galleryitemroute.js';  // Your gallery routes
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; 
import categoryRouter from './roots/categoryRoute.js';
import dotenv from "dotenv";

dotenv.config();  // Load environment variables from a .env file

const app = express();
app.use(bodyParser.json());  // Parse incoming requests with JSON payloads

// JWT Middleware - Verify token for all routes except /api/users/login
app.use((req, res, next) => {
    // Skip JWT validation for login route (only this route is excluded)
    if (req.url === '/api/users/login') {
        return next();  // Proceed without token validation for login
    }

    // Extract token from authorization header
    const token = req.header("authorization") ? req.header("authorization").replace("Bearer ", "") : null;

    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Validate the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            // Handle different JWT errors
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired, please log in again" });
            }
            return res.status(401).json({ message: "Invalid token", error: err.message });
        }

        // Attach decoded token to the request object for use in routes
        req.user = decoded;
        console.log('Token decoded:', decoded);  // Optional: Log the decoded token for debugging purposes
        next();  // Continue to the next middleware or route
    });
});

// Define your routes
app.use('/api/users', userRouter);       // User routes (login, etc.)
app.use('/api/gallery', galleryitemrouter); // Gallery routes (optional protection)
app.use('/api/category', categoryRouter);  // Category routes (protected)

// Database connection string
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Connection failed", err);
    });

// Start the server
const PORT = process.env.PORT || 5000;  // Use the PORT from environment or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
