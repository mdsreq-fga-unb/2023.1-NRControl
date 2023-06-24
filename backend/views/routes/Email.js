const express = require("express");
const router = express.Router();
const emailController = require("../../controllers/EmailControllers");

router.post("/api/email", emailController.sendEmail);

module.exports = router;
