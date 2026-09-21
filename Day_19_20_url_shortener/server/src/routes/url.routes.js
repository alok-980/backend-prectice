import express from 'express';
import {
    createUrlController,
    getAllUrlController,
    deleteUrlController
} from '../controller/url.controller.js'

const router = express.Router();

router.post('/', createUrlController);
router.get('/', getAllUrlController);
router.delete('/:shortCode', deleteUrlController);

export default router;