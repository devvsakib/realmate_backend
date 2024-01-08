import express from 'express';
import { userRoutes } from './userRoutes.js';
import { authRoutes } from './authRoutes.js';
import { otherRoutes } from './otherRoutes.js';

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/other', otherRoutes);

export default router;
