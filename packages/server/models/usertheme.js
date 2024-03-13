// usertheme.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTheme extends Model {
    static associate(models) {
      UserTheme.belongsTo(models.Themes, {
        foreignKey: 'themeId',
        as: 'theme',
        onDelete: 'CASCADE',
      });
    }
  }
  UserTheme.init({
    ownerId: DataTypes.INTEGER,
    themeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserTheme',
  });
  return UserTheme;
};
