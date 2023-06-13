module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
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
  });

  return Users;
};