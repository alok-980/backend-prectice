import express from "express";
import {
    registerController,
    accountController
} from "../controllers/auth.controller.js";

import {
    authenticateUser
} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/register", registerController);
router.get("/me", authenticateUser, accountController);

export default router;