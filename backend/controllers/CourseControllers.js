const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Course } = require("../models/schemas");
const path = require("path");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    key(req, file, callback) {
      callback(null, uuidv4() + path.extname(file.originalname));
    },
  }),
});

exports.addFileUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const fileUrl = req.file.location;

    const updatedUrl = await Course.update(
      { fileUrl: fileUrl },
      { where: { id: id } }
    );

    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Falha ao atualizar o fileUrl do curso." });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createCourses = (req, res) => {
  const { name, course, info, conclusiondate, expirationdate } = req.body;

  Course.create({
    name: name,
    course: course,
    info: info,
    conclusiondate: conclusiondate,
    expirationdate: expirationdate,
  })
    .then((course) => {
      res.status(201).json(course);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getCourseById = (req, res) => {
  const courseId = req.params.id;

  Course.findByPk(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
      res.json(course);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.putCourse = async (req, res) => {
  const id = req.params.id;
  const courseData = req.body;

  try {
    const updatedCourse = await Course.update(courseData, {
      where: { id: id },
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar curso." });
  }
};

exports.upload = upload;

