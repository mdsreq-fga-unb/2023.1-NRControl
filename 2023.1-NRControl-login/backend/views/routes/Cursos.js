const express = require("express");
const router = express.Router();
const cursosController = require("../../controllers/CursosControllers");

router.get("/", cursosController.getCursos);
router.post("/", cursosController.createCurso);

module.exports = router;
