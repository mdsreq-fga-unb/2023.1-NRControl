const { DataTypes } = require("sequelize");
const EmployeeModel = require("../models/schemas/Employee");

describe("Employee Model", () => {
  it("deve definir corretamente os campos do modelo", () => {
    const sequelizeMock = {
      define: jest.fn(() => {
        return {
          name: "Employee",
          rawAttributes: {
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            cpf: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            address: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            phonenumber: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            birthday: {
              type: DataTypes.DATEONLY,
            },
            admissiondate: {
              type: DataTypes.DATEONLY,
            },
            asodate: {
              type: DataTypes.DATEONLY,
            },
          },
        };
      }),
    };

    const model = EmployeeModel(sequelizeMock, DataTypes);

    expect(model.name).toBe("Employee");
    expect(sequelizeMock.define).toHaveBeenCalledTimes(1);
    expect(sequelizeMock.define).toHaveBeenCalledWith(
      "Employee",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phonenumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthday: {
          type: DataTypes.DATEONLY,
        },
        admissiondate: {
          type: DataTypes.DATEONLY,
        },
        asodate: {
          type: DataTypes.DATEONLY,
        },
      }
    );
  });
});
