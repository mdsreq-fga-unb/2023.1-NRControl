const express = require("express");
const router = express.Router();
const uploadController = require("../../controllers/UploadController");

router.post("/upload", userController.registerUser);

module.exports = router;