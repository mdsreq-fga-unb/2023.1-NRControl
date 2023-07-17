const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/CourseControllers");
const upload = courseController.upload; 

router.get("/", courseController.getCourses);
router.post("/", courseController.createCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.putCourse);
router.post("/file/:id", upload.single("file"), courseController.addFileUrl); 

module.exports = router;
