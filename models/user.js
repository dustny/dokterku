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
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
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