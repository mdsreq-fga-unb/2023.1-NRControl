const express = require("express");
const router = express.Router();
const { Employee } = require("../models");
const { validateToken } = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const listOfEmployees = await Employee.findAll();
  res.json(listOfEmployees);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findByPk(id);
  res.json(employee);
});

router.post("/", async (req, res) => {
  const employees = req.body;
  await Employee.create(employees);
  res.json(employees);
});

module.exports = router;
