'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cat = sequelize.define('Cat', {
    color: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    habitat: DataTypes.STRING,
    personality: DataTypes.STRING,
    age: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    instanceMethods: {
      toJSON(){
        return {
          color: this.get('color'),
          breed: this.get('breed'),
          gender: this.get('gender'),
          habitat: this.get('habitat'),
          personality: this.get('personality'),
          age: this.get('age'),
          imageUrl: this.get('imageUrl')
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cat;
};
