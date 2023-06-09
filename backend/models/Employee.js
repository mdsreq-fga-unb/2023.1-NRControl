module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
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
  });
  return Employee;
};
