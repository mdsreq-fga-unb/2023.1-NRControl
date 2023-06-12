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
  });
  return Cursos;
};
