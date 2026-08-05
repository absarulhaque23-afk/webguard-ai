import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { auth } from '../middlewares/auth';

const router = Router();

router.use(auth);

router.get('/stats', dashboardController.getStats);

export default router;
