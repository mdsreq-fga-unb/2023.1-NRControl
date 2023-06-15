const { Users } = require("../models/schemas");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
    });
    res.json("Solicitação bem-sucedida");
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "Email não existe no banco de dados" });
  } else {
    bcrypt.compare(password, user.password).then((validate) => {
      if (!validate) {
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
};
