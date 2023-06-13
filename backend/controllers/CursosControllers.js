const { Cursos } = require("../models/schemas");

exports.getCursos = (req, res) => {
  Cursos.findAll()
    .then((cursos) => res.json(cursos))
    .catch((err) => res.json(err));
};

exports.createCurso = (req, res) => {
  const { name, curso, info, conclusiondate, expirationdate } = req.body;

  Cursos.create({
    name: name,
    curso: curso,
    info: info,
    conclusiondate: conclusiondate,
    expirationdate: expirationdate,
  })
    .then((curso) => {
      res.status(201).json(curso);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
