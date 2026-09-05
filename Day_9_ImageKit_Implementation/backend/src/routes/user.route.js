const express = require('express');

const router = express.Router();

const upload = require('../config/multer.config');

const {
    createUserController,
    getAllUserController
} = require('../controllers/user.controller')

router.post('/create', upload.single('image'), createUserController);
router.get('/getAllUser', getAllUserController);

module.exports = router;