"use strict";

module.exports = function UsuarioModelFactory(sequelize, DataTypes) {
    const Usuario = sequelize.define("Usuario", {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
        fotoURL: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        cep: DataTypes.STRING,
        numero: DataTypes.STRING,
        bairro: DataTypes.STRING,
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

    Usuario.associate = function(models) {
      Usuario.belongsTo(models.Cidade)

      Usuario.hasMany(models.Pet)
      Usuario.hasMany(models.Adocao)
      Usuario.hasMany(models.Sessao)
    }

    return Usuario;
};
