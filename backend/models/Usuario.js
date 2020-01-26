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
    dataNascimento: DataTypes.DATE,
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


// {
//   "nome": "teste",
//   "email": "teste",
//   "senha": "teste",
//   "longitude": "123",
//   "latitude": "123",
//   "fotoURL": "teste/teste",
//   "logradouro": "teste",
//   "cep": "teste",
//   "dataNascimento": "12/12/2012",
//   "numero": "teste",
//   "bairro": "teste",
//   "cidadeNome": "teste",
//   "cidadeSigla": "teste",
//   "estadoSigla": "teste",
//   "estadoNome": "teste",
//   "keepConnection": true
// }
