const { Users } = require("../models/schemas");
const bcrypt = require("bcrypt");
const {
  resetPasswordRequest,
  validateResetPasswordUrl,
  resetPassword,
} = require("../controllers/PasswordControllers");

// Mock das dependências
jest.mock("../models/schemas");
jest.mock("bcrypt");

describe("userController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  

  describe("validateResetPasswordUrl", () => {
    it("should validate reset password URL", async () => {
      const mockRequest = {
        params: {
          id: "1",
          token: "testtoken",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const mockUser = {
        id: "1",
        token: "testtoken",
        tokenExpiration: new Date(),
      };

      Users.findOne.mockResolvedValue(mockUser);

      await validateResetPasswordUrl(mockRequest, mockResponse);

      expect(Users.findOne).toHaveBeenCalledWith({
        where: {
          id: mockRequest.params.id,
          token: mockRequest.params.token.toString(),
        },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith("URL Válida");
    });

    it("should handle invalid reset password URL", async () => {
      const mockRequest = {
        params: {
          id: "1",
          token: "testtoken",
        },
      };
      const mockResponse= {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Users.findOne.mockResolvedValue(null);

      await validateResetPasswordUrl(mockRequest, mockResponse);

      expect(Users.findOne).toHaveBeenCalledWith({
        where: {
          id: mockRequest.params.id,
          token: mockRequest.params.token.toString(),
        },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: "Link inválido",
      });
    });
  });

  describe("resetPassword", () => {
    it("should reset password", async () => {
      const mockRequest = {
        body: {
          password: "newPassword",
        },
        params: {
          token: "testtoken",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockUser = {
        token: mockRequest.params.token.toString(),
        save: jest.fn().mockResolvedValue(),
      };

      Users.findOne.mockResolvedValue(mockUser);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");

      await resetPassword(mockRequest, mockResponse);

      expect(Users.findOne).toHaveBeenCalledWith({
        where: { token: mockRequest.params.token.toString() },
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Senha atualizada com sucesso",
      });
    });

    it("should handle error when resetting password", async () => {
      const mockRequest = {
        body: {
          password: "newPassword",
        },
        params: {
          token: "testtoken",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new Error("Internal Server Error");

      Users.findOne.mockRejectedValue(mockError);

      await resetPassword(mockRequest, mockResponse);

      expect(Users.findOne).toHaveBeenCalledWith({
        where: { token: mockRequest.params.token.toString() },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });
});
