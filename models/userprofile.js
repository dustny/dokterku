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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    city: DataTypes.STRING,
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};