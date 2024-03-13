'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Themes, {
        foreignKey: 'userId',
        as: 'theme', 
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    phone: DataTypes.STRING,
    login: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};