import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { auth } from '../middlewares/auth';
import { adminAuth } from '../middlewares/admin';

const router = Router();

router.use(auth, adminAuth);

router.get('/users', adminController.getUsers);
router.get('/scans', adminController.getAllScans);
router.get('/model', adminController.getModelInfo);
router.get('/analytics', adminController.getAnalytics);

export default router;
