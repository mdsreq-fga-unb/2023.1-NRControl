const express = require("express");
const router = express.Router();
const userController = require("../../controllers/PasswordControllers");

router.post("/", userController.resetPasswordRequest);
router.get("/:id/:token", userController.validateResetPasswordUrl);
router.post("/:id/:token", userController.resetPassword);

module.exports = router;
