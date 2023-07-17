const sgMail = require("@sendgrid/mail");
const { sendEmail } = require("../controllers/EmailControllers"); // Substitua pelo caminho correto para o seu módulo
jest.mock("@sendgrid/mail");

describe("sendEmail", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("deve enviar o email com sucesso e retornar status 201", async () => {
    const req = {
      body: {
        to: "destinatario@example.com",
        subject: "Assunto do email",
        text: "Conteúdo do email",
      },
    };
    const res = {
      sendStatus: jest.fn(),
      status: jest.fn(() => res),
    };
    const consoleLogSpy = jest.spyOn(console, "log");

    await sendEmail(req, res);

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: "destinatario@example.com",
      from: process.env.FROM_EMAIL,
      subject: "Assunto do email",
      text: "Conteúdo do email",
    });
    expect(consoleLogSpy).toHaveBeenCalledWith("Email enviado!");
    expect(res.sendStatus).toHaveBeenCalledWith(201);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve lidar com erros ao enviar o email e retornar status 500", async () => {
    const req = {
      body: {
        to: "destinatario@example.com",
        subject: "Assunto do email",
        text: "Conteúdo do email",
      },
    };
    const res = {
      sendStatus: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const error = new Error("Erro ao enviar o email");

    sgMail.send.mockRejectedValue(error);

    await sendEmail(req, res);

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: "destinatario@example.com",
      from: process.env.FROM_EMAIL,
      subject: "Assunto do email",
      text: "Conteúdo do email",
    });
    expect(console.log).toHaveBeenCalledWith("Erro ao enviar o email:", error);
    expect(res.sendStatus).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Falha no envio");
  });
});
