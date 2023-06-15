const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/CourseControllers");

router.get("/", courseController.getCourses);
router.post("/", courseController.createCourses);

module.exports = router;
