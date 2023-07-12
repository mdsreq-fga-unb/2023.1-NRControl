const { Employee, Cursos } = require("../models/schemas");

exports.getEmployees = async (req, res) => {
  try {
    const listOfEmployees = await Employee.findAll();
    res.json(listOfEmployees);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter lista de funcionários." });
  }
};

exports.getEmployeeById = async (req, res) => {
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
};

exports.createEmployee = async (req, res) => {
  const employees = req.body;
  try {
    const createdEmployee = await Employee.create(employees);
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(500).json({ error: "Falha ao criar funcionário." });
  }
};

exports.compareNames = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const cursos = await Cursos.findAll();

    const matchedCourses = cursos.filter((employee) =>
      cursos.some((curso) => curso.name === employee.name)
    );

    res.json(matchedCourses);
  } catch (error) {
    res.status(500).json({ error: "Falha ao comparar nomes." });
  }
};

exports.putEmployee = async (req, res) => {
  const id = req.params.id;
  const employeeData = req.body;

  try {
    const updatedEmployee = await Employee.update(employeeData, {
      where: { id: id },
    });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar funcionário." });
  }
};

exports.checkCpfExistence = async (req, res) => {
  const cpf = req.params.cpf;
  try {
    const employee = await Employee.findOne({ where: { cpf: cpf } });
    if (employee) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Falha ao verificar a existência do CPF." });
  }
};
