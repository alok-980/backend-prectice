const express = require('express');

const router = express.Router();

const upload = require('../config/multer.config');

const {
    createUserController
} = require('../controllers/user.controller')

router.post('/create', upload.single('image'), createUserController);

module.exports = router;