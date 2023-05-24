const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//rodar servidor
app.listen(3005, () => {
  console.log("Servidor está rodando na porta 3005");
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post("/login", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM Login WHERE username = ? &&  senha = ?";

  const Values = [sentloginUserName, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: "Usuario ou Senha Incorretos" });
    }
  });
});
