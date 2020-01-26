"use strict";

module.exports = function UsuarioModelFactory(sequelize, DataTypes) {
    const Usuario = sequelize.define("Usuario", {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        teste: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
    });

    Usuario.associate = function(models) {
    }

    return Usuario;
};
