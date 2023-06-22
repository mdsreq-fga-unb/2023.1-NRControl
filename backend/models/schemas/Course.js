module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
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
  });
  return Course;
};
