'use strict';
const {
  Model
} = require('sequelize');

let bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Disease, {through: models.MedicalRecord})
      User.hasOne(models.UserProfile)
      User.hasMany(models.MedicalRecord)
    }

    static findUser(){
      return this.findAll({where: {role:'patient'},  include:{association: 'UserProfile', attributes:['firstName','lastName']}})
    }

  }
  
  User.init({
    username:  {
      type: DataTypes.STRING,
      allowNull :false,
      unique :true,
      validate:{
        notNull:{
          msg: "username is Required"
        },
        notEmpty:{
          msg: "username is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "password is Required"
        },
        notEmpty:{
          msg: "password is Required"
        },
        customValidator(value) {
          if (value.length < 5) {
            throw new Error("Password Must be more than 5 characters");
          }
          const hasUppercase = /[A-Z]/.test(value);
          const hasLowercase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const specialChars = "!@#$%^&*()_+{}\[\]:;<>,.?~\\-";
    
          if (!(hasUppercase && hasLowercase && hasNumber)) {
            throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
          }
    
          if (![...specialChars].some(char => value.includes(char))) {
            throw new Error("Password must contain at least one special character");
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg: "Role is Required"
        },
        notEmpty:{
          msg: "Role is Required"
        }
      }
    },
  }, {
    hooks : {
      beforeCreate(instance, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};