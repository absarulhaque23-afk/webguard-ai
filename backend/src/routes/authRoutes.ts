import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { registerValidation, loginValidation } from '../validators/authValidator';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/logout', auth, authController.logout);
router.get('/me', auth, authController.getMe);

export default router;
