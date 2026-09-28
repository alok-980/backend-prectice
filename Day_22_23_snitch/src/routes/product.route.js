import express from 'express';
import { authenticated, isSeller } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';
import { parseProductData } from '../middleware/parseProductData.middleware.js';
import { productCreateValidator, productIdValidator } from '../validators/product.validator.js';
import { createProduct, listAllProducts, listAllProductToSeller, toggleProductLising } from '../controllers/product.controller.js';

const router = express.Router();

router.post(
    '/',
    authenticated,
    isSeller,
    upload.array("images"),
    parseProductData,
    productCreateValidator,
    createProduct
)

router.get('/', listAllProducts)
router.get('/seller', authenticated, listAllProductToSeller)
router.patch('/:id', authenticated, isSeller, productIdValidator, toggleProductLising)

export default router;