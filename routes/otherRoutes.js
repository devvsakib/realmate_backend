// routes/otherRoutes.js
import express from 'express';
import { anotherFunctionality, protectedRoute } from '../controllers/otherController.js';
import { authenticateToken } from '../util/authentication.js';

const router = express.Router();

// Route that requires authentication
router.get('/protected', authenticateToken, protectedRoute);

// Example public route
router.get('/public', anotherFunctionality);

export { router as otherRoutes}
