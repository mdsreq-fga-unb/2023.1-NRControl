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
const expirationDate = new Date();
expirationDate.setMinutes(expirationDate.getMinutes() + 15);

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.SENDGRID_API,
        },
      })
    );

    await transporter.sendMail({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: subject,
      text: text,
    });
  } catch (error) {
    throw new Error("Erro ao enviar o email");
  }
};

router.post("/", async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await Users.findOne({ where: { email: req.body.email } });
    if (!user)
      return res
        .status(409)
        .send({ message: "Email não existe na base de dados" });

    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.json({ status: "Erro ao gerar o token" });
      }

      const token = buffer.toString("hex");
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 15, 0, 0);

      user.token = token;
      user.tokenExpiration = expirationDate;
      user.save().then(async (result) => {
        const url = `${process.env.URL_Link}/password-reset/${user.id}/${token}/`;
        await sendEmail(
          user.email,
          "Redefinição de Senha",
          `
          Olá Administrador,
        
          Recebemos uma solicitação de redefinição de senha para a sua conta na Sonda Engenharia.
        
          Por favor, clique no seguinte link para redefinir sua senha:
        
          ${url}
        
          Se você não solicitou esta redefinição de senha, por favor, ignore este e-mail.
        
          Atenciosamente,
          Equipe Sonda Engenharia
          `
        );

        res.status(200).send({
          message: "O link para atualizar a sua senha foi enviada para o email",
        });
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/:token", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Link Inválido" });

    const token = await Users.findOne({
      userId: user.id,
      token: req.params.token,
      tokenExpiration: { $gte: new Date() },
    });
    if (!token) return res.status(400).send({ message: "Link inválido" });

    res.status(200).send("URL Válida");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/:id/:token", async (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.params.token;

  try {
    const user = await Users.findOne({
      token: sentToken.toString(),
    });

    if (!user) {
      return res
        .status(422)
        .json({ error: "Tente novamente, a sessão expirou" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;

    await user.save();

    if (user.saveError) {
      return res.status(500).json({ error: "Erro no Servidor" });
    }

    res.json({ message: "Senha atualizada com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
