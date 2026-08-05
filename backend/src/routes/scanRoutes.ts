import { Router } from 'express';
import * as scanController from '../controllers/scanController';
import { auth } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { scanValidation } from '../validators/scanValidator';
import { scanLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.use(auth);

router.post('/', scanLimiter, validate(scanValidation), scanController.createScan);
router.get('/', scanController.getScans);
router.get('/:id', scanController.getScanById);
router.delete('/:id', scanController.deleteScan);

export default router;
