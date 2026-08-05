import { Router } from 'express';
import authRoutes from './authRoutes';
import scanRoutes from './scanRoutes';
import dashboardRoutes from './dashboardRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/scans', scanRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/admin', adminRoutes);

export default router;
