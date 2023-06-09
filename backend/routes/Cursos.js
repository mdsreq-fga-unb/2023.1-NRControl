const express = require("express");
const router = express.Router();
const { Cursos } = require("../models");

router.get("/", (req, res) => {
  Cursos.findAll()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  const { name, curso } = req.body;

  Cursos.create({
    name: name,
    curso: curso,
  })
    .then((curso) => {
      res.status(201).json(curso);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
