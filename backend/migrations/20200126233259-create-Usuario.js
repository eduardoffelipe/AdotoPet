'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      longitude: Sequelize.STRING,
      latitude: Sequelize.STRING,
      fotoURL: Sequelize.STRING,
      logradouro: Sequelize.STRING,
      cep: Sequelize.STRING,
      dataNascimento: Sequelize.DATE,
      numero: Sequelize.STRING,
      bairro: Sequelize.STRING,
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuario');
  }
};
