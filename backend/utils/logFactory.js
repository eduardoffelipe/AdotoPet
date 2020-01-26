const config = require(`${process.cwd()}/config/config`);
const io = require('socket.io-client');

const urlLog = config[process.env.NODE_ENV].log_url;
const socket = io(urlLog);

socket.on('connect', (data) => {
  console.log('Connected with log server');
});

socket.on('error', (error) => {
  console.log('Error while connect to log server');
  console.log(error);
});

module.exports = function customLogInstall(){

  const logFunctionNative = global.console.log;
  global.console.log = function(...data){
    socket.emit('addLog', {
      empresa: 'AdotoPet',
      message: data,
      stack: null,
      data: new Date(),
      type: "LOG"
    });
    logFunctionNative.apply(global.console, arguments);
  }

  const errorFunctionNative = global.console.error;
  global.console.error = function(error){
    socket.emit('addLog', {
      empresa: 'AdotoPet',
      message: [error.message],
      stack: error.stack,
      data: new Date(),
      type: "ERROR"
    });
    errorFunctionNative.apply(global.console, arguments);
  }

  const warnFunctionNative = global.console.warn;
  global.console.warn = function(...data){
    socket.emit('addLog', {
      empresa: 'AdotoPet',
      message: data,
      stack: null,
      data: new Date(),
      type: "WARNING"
    });
    warnFunctionNative.apply(global.console, arguments);
  }


}
