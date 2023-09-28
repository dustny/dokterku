'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.belongsToMany(models.User, {through: models.MedicalRecord})
    }
  }
  Disease.init({
    name: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "Name is Required"
        },
        notEmpty:{
          msg: "Name is Required"
        }
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull :false,
      validate:{
        notNull:{
          msg: "Description is Required"
        },
        notEmpty:{
          msg: "Description is Required"
        }
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull :false,
      validate:{
        notNull:{
          msg: "Level is Required"
        },
        notEmpty:{
          msg: "Level is Required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};