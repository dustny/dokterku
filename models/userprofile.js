'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    get dateConvert() {
      return this.dateOfBirth.toISOString().split("T")[0]
    }

    get formatGender() {
      if(this.gender === 'F'){
        return 'Female'
      }
      if(this.gender === 'M'){
        return 'Male'
      }
    }

  }
  UserProfile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "First Name is Required"
        },
        notEmpty:{
          msg: "First Name is Required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "Last Name is Required"
        },
        notEmpty:{
          msg: "Last Name is Required"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "Date is Required"
        },
        notEmpty:{
          msg: "Date is Required"
        }
      }
    },
    gender:{
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "Gender is Required"
        },
        notEmpty:{
          msg: "Gender is Required"
        }
      }
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "Blood Type is Required"
        },
        notEmpty:{
          msg: "Blood Type is Required"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "City is Required"
        },
        notEmpty:{
          msg: "City is Required"
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "User is Required"
        },
        notEmpty:{
          msg: "User is Required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};