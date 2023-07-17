const { Users } = require("../models/schemas");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Importe o controlador e os métodos de teste
const {
  resetPasswordRequest,
  validateResetPasswordUrl,
  resetPassword,
} = require("../controllers/PasswordControllers");

// Caso de teste para resetPasswordRequest
describe("resetPasswordRequest", () => {
  it("deve retornar 400 se o email não for fornecido", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await resetPasswordRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  it("deve retornar 409 se o email não existir na base de dados", async () => {
    const req = { body: { email: "emailnexiste@example.com" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock da função Users.findOne para retornar null
    Users.findOne = jest.fn().mockResolvedValue(null);

    await resetPasswordRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalled();
  });


});

// Caso de teste para validateResetPasswordUrl
describe("validateResetPasswordUrl", () => {
  it("deve retornar 400 se o link for inválido", async () => {
    const req = { params: { id: "idinexistente", token: "tokeninexistente" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock da função Users.findOne para retornar null
    Users.findOne = jest.fn().mockResolvedValue(null);

    await validateResetPasswordUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  it("deve retornar 400 se o link estiver expirado", async () => {
    const req = { params: { id: "validoid", token: "validotoken" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock da função Users.findOne para retornar um usuário com tokenExpiration passado
    Users.findOne = jest.fn().mockResolvedValue({
      tokenExpiration: new Date("2021-01-01"), // Defina uma data passada aqui
    });

    await validateResetPasswordUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  
});

// Caso de teste para resetPassword
describe("resetPassword", () => {
  it("deve retornar 422 se o token for inválido", async () => {
    const req = { body: { password: "novasenha" }, params: { token: "tokeninexistente" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock da função Users.findOne para retornar null
    Users.findOne = jest.fn().mockResolvedValue(null);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalled();
  });

});
