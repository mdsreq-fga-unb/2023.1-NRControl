const  { registerUser }  = require("../controllers/UserControllers");
const  { Users }  = require("../models/schemas");
const  bcrypt  = require("bcrypt");
const { loginUser } = require("../controllers/UserControllers");
const { sign } = require("jsonwebtoken");

//Teste da função registerUser

describe("Testes para a função registerUser", () => {
  it("Deve criar um novo usuário no banco de dados com a senha criptografada", async () => {
    // Dados de entrada para o teste
    const req = {
      body: {
        username: "Gabriel",
        email: "Gabriel@gmail.com",
        password: "1234",
      },
    };
    const res = {
      json: jest.fn(),
    };

    // Mock da função bcrypt.hash
    const hash = "hashedsenha";
    bcrypt.hash = jest.fn().mockResolvedValue(hash);

    // Mock da função Users.create
    Users.create = jest.fn();

    // Execução da função a ser testada
    await registerUser(req, res);

    // Verificações de expectativas
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(Users.create).toHaveBeenCalledWith({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    expect(res.json).toHaveBeenCalledWith("Solicitação bem-sucedida");
  });
});



// Teste da função loginUser

jest.mock("../models/schemas", () => ({
  Users: {
    findOne: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Testes para a função loginUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar um token válido ao fazer login com sucesso", async () => {
    const req = {
      body: {
        email: "Gabriel@gmail.com",
        password: "1234",
      },
    };
    const res = {
      json: jest.fn(),
    };

    const user = {
      id: 1,
      username: "Gabriel",
      password: "hashedsenha",
    };
    Users.findOne.mockResolvedValue(user);

    const validate = true;
    bcrypt.compare.mockResolvedValue(validate);

    const token = "validtoken";
    sign.mockReturnValue(token);

    await loginUser(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
    expect(sign).toHaveBeenCalledWith(
      { username: user.username, id: user.id },
      process.env.SECRET
    );
    expect(res.json).toHaveBeenCalledWith(token);
  });

  it("Deve retornar erro ao fazer login com email inexistente", async () => {
    const req = {
      body: {
        email: "nexiste@example.com",
        password: "1234",
      },
    };
    const res = {
      json: jest.fn(),
    };

    Users.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.json).toHaveBeenCalledWith({ error: "Email não existe no banco de dados" });
  });

  it("Deve retornar erro ao fazer login com senha incorreta", async () => {
    const req = {
      body: {
        email: "Gabriel@gmail.com",
        password: "senhaerrada",
      },
    };
    const res = {
      json: jest.fn(),
    };

    const user = {
      id: 1,
      username: "Gabriel",
      password: "hashedenha",
    };
    Users.findOne.mockResolvedValue(user);

    const validate = false;
    bcrypt.compare.mockResolvedValue(validate);

    await loginUser(req, res);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
    expect(res.json).toHaveBeenCalledWith({ error: "Email e/ou Senha Incorreta" });
  });
});

