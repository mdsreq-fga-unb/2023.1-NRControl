const { Course } = require("../models/schemas");

exports.getCourses = (req, res) => {
  Course.findAll()
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
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
