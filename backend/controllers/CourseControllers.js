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
