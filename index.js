import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './roots/userRoute.js';  // Your user routes
import galleryitemrouter from './roots/galleryitemroute.js';  // Your gallery routes
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; 
import categoryRouter from './roots/categoryRoute.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// JWT Middleware - Verify token for all routes except /api/users/login
app.use((req, res, next) => {
    // Skip JWT validation for login route
    if (req.url === '/api/users/login') {
        return next();  // Proceed without token validation for login
    }

    // Extract token from authorization header
    const token = req.header("authorization") ? req.header("authorization").replace("Bearer ", "") : null;

    if (token) {
        // Validate the token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Token expired, please log in again" });
                }
                return res.status(401).json({ message: "Invalid token", error: err.message });
            }

            req.user = decoded; // Attach the decoded token to the request object
            console.log('Token decoded:', decoded);
            next();  // Continue to the next middleware or route
        });
    } else {
        return res.status(401).json({ message: "No token provided" });  // Return 401 if no token is provided
    }
});

// Your routes
app.use('/api/users', userRouter);  // Protect user routes with JWT middleware
app.use('/api/gallery', galleryitemrouter);  // You can protect gallery routes too if needed
app.use("/api/category", categoryRouter); // You can protect category routes

// Database connection string
const connectionstring = process.env.MONGO_URL;
mongoose.connect(connectionstring)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() => {
        console.log("Connection failed");
    });

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
