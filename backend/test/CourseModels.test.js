const { DataTypes } = require("sequelize");
const CourseModel = require("../models/schemas/Course"); 

describe("Course Model", () => {
  it("deve definir corretamente os campos do modelo", () => {
    const sequelizeMock = {
      define: jest.fn(() => {
        return {
          name: "Course",
          rawAttributes: {
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            course: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            info: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conclusiondate: {
              type: DataTypes.DATEONLY,
            },
            expirationdate: {
              type: DataTypes.DATEONLY,
            },
          },
        };
      }),
    };

    const model = CourseModel(sequelizeMock, DataTypes);

    expect(model.name).toBe("Course");
    expect(sequelizeMock.define).toHaveBeenCalledTimes(1);
    expect(sequelizeMock.define).toHaveBeenCalledWith(
      "Course",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        course: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        info: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        conclusiondate: {
          type: DataTypes.DATEONLY,
        },
        expirationdate: {
          type: DataTypes.DATEONLY,
        },
      }
    );
  });
});
