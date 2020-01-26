"use strict";

module.exports = function TipoPetModelFactory(sequelize, DataTypes) {
  const TipoPet = sequelize.define("TipoPet", {
    raca: DataTypes.STRING,
    reino: DataTypes.STRING,
    descricao: DataTypes.STRING,
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

  TipoPet.associate = function(models) {
    TipoPet.hasMany(models.Pet)
  }

  return TipoPet;
};
