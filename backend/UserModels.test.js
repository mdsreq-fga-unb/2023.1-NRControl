const { DataTypes } = require("sequelize");
const UsersModel = require("../models/schemas/Users"); // Substitua pelo caminho correto para o seu modelo

describe("Users Model", () => {
  it("deve definir corretamente os campos do modelo", () => {
    const sequelizeMock = {
      define: jest.fn(() => {
        return {
          name: "Users",
          rawAttributes: {
            username: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                isEmail: {
                  args: true,
                  msg: "O formato do e-mail é inválido.",
                },
              },
            },
            password: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                len: [8, Infinity],
              },
            },
            userId: {
              type: DataTypes.INTEGER,
              unique: true,
            },
            token: {
              type: DataTypes.STRING,
            },
            tokenExpiration: {
              type: DataTypes.DATE,
            },
          },
        };
      }),
    };

    const model = UsersModel(sequelizeMock, DataTypes);

    expect(model.name).toBe("Users");
    expect(sequelizeMock.define).toHaveBeenCalledTimes(1);
    expect(sequelizeMock.define).toHaveBeenCalledWith(
      "Users",
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              args: true,
              msg: "O formato do e-mail é inválido.",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, Infinity],
          },
        },
        userId: {
          type: DataTypes.INTEGER,
          unique: true,
        },
        token: {
          type: DataTypes.STRING,
        },
        tokenExpiration: {
          type: DataTypes.DATE,
        },
      }
    );
  });
  
  it("deve validar o comprimento mínimo da senha", () => {
    const sequelizeMock = {
      define: jest.fn(() => {
        return {
          name: "Users",
          rawAttributes: {
            password: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                len: {
                  args: [8, Infinity],
                  msg: "A senha deve ter no mínimo 8 caracteres.",
                },
              },
            },
          },
        };
      }),
    };

    const model = UsersModel(sequelizeMock, DataTypes);

    const passwordAttribute = model.rawAttributes.password;

    expect(passwordAttribute.validate.len.args).toBeTruthy();
    expect(passwordAttribute.validate.len.args[0]).toEqual(8);
    expect(passwordAttribute.validate.len.msg).toBe(
      "A senha deve ter no mínimo 8 caracteres."
    );
  });
});
