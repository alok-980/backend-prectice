import express from "express";

const router = express.Router();

import {
    registerController,
    loginController,
    logoutController,
    meController,
    newRefreshTokenController
} from "../controller/auth.controller.js"

import {
    isAuthenticated
} from "../middleware/auth.middleware.js"

router.post('/register', registerController);
router.post('/login', loginController);
router.put('/logout', isAuthenticated, logoutController);
router.put('/refresh-token', newRefreshTokenController);
router.get('/me', isAuthenticated, meController);

export default router

