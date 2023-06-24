const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API);

  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("Email enviado!");
    res.sendStatus(201);
  } catch (error) {
    console.log("Erro ao enviar o email:", error);
    res.status(500).send("Falha no envio");
  }
};
