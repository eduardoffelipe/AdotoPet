#!/usr/bin/env node
const moment = require('moment-timezone');
const logFactory = require(`../utils/logFactory`);

//logFactory();

function MomentoProtoChange() {

    moment.locale('pt-br');
    moment.tz.setDefault("America/Fortaleza");
    global.moment = moment;
}
MomentoProtoChange();


const initServer = async function(models, env, server, config) {
    console.log(`================= SERVER SET TO ${env.toUpperCase()} ENV =================`);
    //EM PRODUÇÃO A ATUALIZAÇÃO DO BANCO DE DADOS SE DA NA HORA DE LANÇAR OS APPS

    server.on('error', onError);
    server.on('listening', onListening);

    server.listen(port);

    if (env.toUpperCase() == "development".toUpperCase()) {
        await require(`../utils/syncDataBase.js`)();
    }

    console.log("============ SERVER INITIALIZED ============");
}


const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const app = require('../app');
const debug = require('debug')('init:server');
const http = require('http');
const models = require("../models");

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

initServer(models, env, server, config)
.then(() => console.log('\n\n\n') )
.catch(err => console.log(err) );


function normalizePort(val) {
    return val;
}

function onError(error) {
    debug("ERROR: " + error);
}

function onListening() {
    debug("Server is listening...");
}

const gracefulShutdown = () => {
    console.log("SERVER IS TURNING OFF");
    server.close(function(err) {
        console.log("BYE BYE");
        // if error, log and exit with error (1 code)
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            process.exit(0);
        }

    })
}

process.on('SIGINT', gracefulShutdown);
process.on('beforeExit', gracefulShutdown);
