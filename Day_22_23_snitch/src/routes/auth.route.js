import express from 'express';
import { loginController, meController, refreshTokenController, registerController } from '../controllers/user.controller.js';
import { registerValidation, loginValidation } from '../validators/auth.validator.js';
import { authenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerValidation, registerController);
router.post('/login', loginValidation, loginController);
router.post('/refresh', refreshTokenController);
router.get('/me', authenticated, meController);

export default router;