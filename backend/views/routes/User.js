const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserControllers");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
