const express = require("express");
const router = express.Router();
const { Employee, Cursos } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfEmployees = await Employee.findAll();
    res.json(listOfEmployees);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter lista de funcionários." });
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Funcionário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter funcionário." });
  }
});

router.post("/", async (req, res) => {
  const employees = req.body;
  try {
    const createdEmployee = await Employee.create(employees);
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar funcionário." });
  }
});

router.get("/compareNames", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const cursos = await Cursos.findAll();

    const matchedCourses = cursos.filter(employee =>
      cursos.some(curso => curso.name === employee.name)
    );

    res.json(matchedCourses);
  } catch (error) {
    res.status(500).json({ error: "Falha ao comparar nomes." });
  }
});

module.exports = router;
