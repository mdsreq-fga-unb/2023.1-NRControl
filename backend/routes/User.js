const express = require("express");
const router = express.Router();
require("dotenv").config();
const { Users } = require("../models");
const { Token } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
    });
    res.json("Solicitação bem-sucedida");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "Email não existe no banco de dados" });
  } else {
    bcrypt.compare(password, user.password).then((validar) => {
      if (!validar) {
        res.json({ error: "Email e/ou Senha Incorreta" });
      } else {
        const token = sign(
          { username: user.username, id: user.id },
          process.env.SECRET
        );
        res.json(token);
      }
    });
  }
});

module.exports = router;