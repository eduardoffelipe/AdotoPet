"use strict";

module.exports = function AdocaoModelFactory(sequelize, DataTypes) {
    const Adocao = sequelize.define("Adocao", {
        dataAdocao: DataTypes.DATE,
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

    Adocao.associate = function(models) {
      Adocao.belongsTo(models.Usuario)
      Adocao.belongsTo(models.Pet)
    }

    return Adocao;
};
