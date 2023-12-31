'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('MedicalRecords', 'DiseaseId', {
      type: Sequelize.INTEGER,
      references: {
       model: {
         tableName: 'Diseases',
       },
       key: 'id'
      }
      })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('MedicalRecords', 'DiseaseId')
  }
};
