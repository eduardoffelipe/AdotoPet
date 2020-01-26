'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('sequelize-sync-diff')(Sequelize);
const basename = path.basename(__filename);
const colors = require('sequelize-log-syntax-colors');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;

function logger(text){
    let firstPoints = text.indexOf(":");
    let prefix = text.substr(0, firstPoints+1);
    console.log(`\n${prefix} ${colors(text)}\n`);
}

debugger;
if(env.toUpperCase() == "development".toUpperCase()){
    config.timezone = process.env.TZ;
    sequelize = new Sequelize(config.database, config.username, config.password,{
        timezone: process.env.TZ,
        logging: logger ,
        ...config
    });
} else {
    let configSequelize = {
        timezone: process.env.TZ,
        logging: process.env.SEQUELIZE_SHOW_LOG ? logger : false,
    };

    if(process.env.SEQUELIZE_SSL){
        configSequelize['dialect'] = 'postgres';
        configSequelize['dialectOptions'] = {
            "ssl": true
        };
    }

    sequelize = new Sequelize(process.env[config.connection_env], configSequelize);
}

const db = {};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
