'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cat = sequelize.define('Cat', {
    color: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    habitat: DataTypes.STRING,
    personality: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cat;
};