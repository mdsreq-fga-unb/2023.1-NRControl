module.exports = (sequelize, DataTypes) => {
  const Cursos = sequelize.define("Cursos", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Cursos;
};
