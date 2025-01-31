import User from "../models/user.js"; // Correct import of the User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

// Get all users
export function getusers(req, res) {
    User.find()
        .then((usersList) => {
            res.json({
                list: usersList
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error fetching users",
                error: err
            });
        });
}

// Create a new user
export function postusers(req, res) {
    const userData = req.body;

    // Hash the user's password before saving
    const password = userData.password;
    const passwordHash = bcrypt.hashSync(password, 10);
    userData.password = passwordHash; // Updating password with hashed value

    // Create a new user instance
    const newUser = new User(userData);

    newUser.save()
        .then(() => {
            res.status(201).json({
                message: "User created successfully"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "User creation failed",
                error: err.message
            });
        });
}

// Delete a user
export function deleteusers(req, res) {
    const email = req.body.email;

    User.deleteOne({ email: email })
        .then(() => {
            res.json({
                message: "User deleted successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete the user",
                error: err.message
            });
        });
}

// Update a user (Put request)
export function putusers(req, res) {
    res.json({
        message: "This is the put request"
    });
}

// Login user and generate a JWT token
export function loginuser(req, res) {
    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email: email })
        .then((user) => {
            // If user is not found
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: "Error comparing password" });
                }

                // If passwords do not match
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                // If passwords match, generate a JWT token with userId and user type (admin or customer)
                const token = jwt.sign(
                    { userId: user._id, type: user.type }, // Added user type in the JWT payload
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                );

                // Send success response with user data and JWT token
                res.json({
                    message: "User logged in successfully",
                    user: user,
                    token: token
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error logging in",
                error: err.message
            });
        });
}
