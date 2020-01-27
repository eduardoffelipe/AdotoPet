"use strict";

module.exports = function SessaoModelFactory(sequelize, DataTypes) {
  const Sessao = sequelize.define("Sessao", {
    token: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    freezeTableName: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
  });

  Sessao.associate = function(models) {
    Sessao.belongsTo(models.Usuario)
  }

  return Sessao;
};
