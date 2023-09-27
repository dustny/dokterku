'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile) 
    }
  }
  MedicalRecord.init({
    treatment: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    diagnosis: DataTypes.STRING,
    dateOfDiagnosis: DataTypes.DATE,
    doctorName: DataTypes.STRING,
    DiseaseId:DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  return MedicalRecord;
};