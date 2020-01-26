"use strict";

module.exports = function EstadoModelFactory(sequelize, DataTypes) {
  const Estado = sequelize.define("Estado", {
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING,
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

  Estado.associate = function(models) {
    Estado.hasMany(models.Cidade)
  }

  return Estado;
};
