const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/CourseControllers");

router.get("/", courseController.getCourses);
router.post("/", courseController.createCourses);
router.get("/:id", courseController.getCourseById);


module.exports = router;
