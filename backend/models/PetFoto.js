"use strict";

module.exports = function PetFotoModelFactory(sequelize, DataTypes) {
    const PetFoto = sequelize.define("PetFoto", {
        url: DataTypes.STRING,
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

    PetFoto.associate = function(models) {
      PetFoto.belongsTo(models.PetFoto)
    }

    return PetFoto;
};
