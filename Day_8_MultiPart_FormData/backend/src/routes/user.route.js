const express = require("express");

const router = express.Router();

const upload = require('../config/multer.config');

const {
    createUserController
} = require("../controllers/user.controller");

router.post('/create', upload.array('images', 5), createUserController);

module.exports = router

