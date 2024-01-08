// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for user logout
router.post('/logout', logoutUser);

export { router as authRoutes}