'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Themes extends Model {
    static associate(models) {
      Themes.hasMany(models.UserTheme, {
        foreignKey: 'themeId',
        as: 'userThemes',
        onDelete: 'CASCADE',
      });
    }
  }
  Themes.init({
    theme: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Themes',
  });
  return Themes;
};
