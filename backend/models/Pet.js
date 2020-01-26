"use strict";

module.exports = function PetModelFactory(sequelize, DataTypes) {
    const Pet = sequelize.define("Pet", {
        nome: DataTypes.STRING,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
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

    Pet.associate = function(models) {
      Pet.belongsTo(models.Usuario)
      Pet.hasOne(models.Adocao)

      Pet.hasMany(models.Post)
      Pet.hasMany(models.PetFoto)
    }

    return Pet;
};
