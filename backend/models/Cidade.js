"use strict";

module.exports = function CidadeModelFactory(sequelize, DataTypes) {
  const Cidade = sequelize.define("Cidade", {
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING,
    estadoNome: DataTypes.STRING,
    estadoSigla: DataTypes.STRING,
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

  Cidade.associate = function(models) {
    Cidade.hasMany(models.Usuario)
  }

  return Cidade;
};
