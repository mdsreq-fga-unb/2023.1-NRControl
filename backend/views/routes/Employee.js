const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/EmployeeControllers");

router.get("/", employeeController.getEmployees);
router.get("/byId/:id", employeeController.getEmployeeById);
router.post("/", employeeController.createEmployee);
router.get("/compareNames", employeeController.compareNames);

module.exports = router;
