import express from "express";

const router = express.Router();

import { addToCartValidator } from '../validators/cart.validator.js';
import { authenticated } from '../middleware/auth.middleware.js'
import { addToCart, getCart } from '../controllers/cart.controller.js'

router.post('/', authenticated, addToCartValidator, addToCart);
router.get('/', authenticated, getCart)

export default router