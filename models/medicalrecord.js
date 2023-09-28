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
    }

    static findMedicalRecordById(){
      let options = {
        attributes: ['salary',
          [sequelize.fn('CONCAT', sequelize.col("firstName"), ' ',
          sequelize.col("lastName")), 'name'],
          'position',
          'id',
        ],
        include: {association: 'Store', attributes:['code', 'id']},
        order: [['name', 'ASC']],
        where: {}
      }
      if(type !== undefined && type !== 'All'){
        options.where = {position: type}
      }      
      return this.findAll(options)
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