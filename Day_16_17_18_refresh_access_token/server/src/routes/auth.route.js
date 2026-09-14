import express from 'express';

const router = express.Router();

import {
    isAuthenticated
} from '../middleware/auth.middleware.js'

import {
    registerController,
    meController,
    refreshTokenController
} from '../controller/auth.controller.js'

router.post('/register', registerController);
router.get('/me', isAuthenticated, meController);
router.post('/refresh', refreshTokenController);

export default router;