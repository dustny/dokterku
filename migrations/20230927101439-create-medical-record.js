'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('MedicalRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      treatment: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      diagnosis: {
        type: Sequelize.STRING
      },
      dateOfDiagnosis: {
        type: Sequelize.DATE
      },
      doctorName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('MedicalRecords');
  }
};