import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './roots/userRoute.js';  // Your user routes
import galleryitemrouter from './roots/galleryitemroute.js';  // Your gallery routes
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; 



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
        jwt.verify(token, "secret", (err, decoded) => {
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

// Database connection string
const connectionstring = "mongodb+srv://tester:123@cluster0.kiuyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
