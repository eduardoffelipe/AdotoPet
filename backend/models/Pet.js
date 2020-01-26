"use strict";

module.exports = function PetModelFactory(sequelize, DataTypes) {
    const Pet = sequelize.define("Pet", {
        nome: DataTypes.STRING,
        url: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
    });

    Pet.associate = function(models) {
    }

    return Pet;
};
