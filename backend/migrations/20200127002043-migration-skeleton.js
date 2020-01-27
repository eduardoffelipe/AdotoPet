'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction()
    return await queryInterface.addColumn('Usuario','sobrenome',{
      type: Sequelize.DataTypes.STRING
    },{transaction: t})

  },

  down: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction()
    return await queryInterface.removeColumn('Usuario','sobrenome',{
      type: Sequelize.DataTypes.STRING
    },{transaction: t})

  }

};
