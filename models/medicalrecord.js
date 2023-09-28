'use strict';
const {
  Model, Op
} = require('sequelize');
const { search } = require('../routes');
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

  }
  MedicalRecord.init({
    treatment: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "treatment is Required"
        },
        notEmpty:{
          msg: "treatment is Required"
        }
      }
    },
    cost:{
      type: DataTypes.INTEGER,
      allowNull :false,
      validate:{
        notNull:{
          msg: "cost is Required"
        },
        notEmpty:{
          msg: "cost is Required"
        }
      }
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "diagnosis is Required"
        },
        notEmpty:{
          msg: "diagnosis is Required"
        }
      }
    },
    dateOfDiagnosis: {
      type: DataTypes.DATE,
      allowNull :false,
      validate:{
        notNull:{
          msg: "dateOfDiagnosis is Required"
        },
        notEmpty:{
          msg: "dateOfDiagnosis is Required"
        }
      }
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "doctorName is Required"
        },
        notEmpty:{
          msg: "doctorName is Required"
        }
      }
    },
    DiseaseId:{
      type: DataTypes.INTEGER,
      allowNull :false,
      validate:{
        notNull:{
          msg: "Disease Must be filled"
        },
        notEmpty:{
          msg: "Disease Must be filled"
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull :false,
      validate:{
        notNull:{
          msg: "User Must be filled"
        },
        notEmpty:{
          msg: "User Must be filled"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  return MedicalRecord;
};