const express = require('express')
const app = express();
const moment = require('moment');
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('HELLO WORLD!!')
})

moment.locale("pt-br");
app.use(function(err, req, res, next) {
    console.error(err);
    if (res.headerSent) {
        return;
    }
    res.status(err.status || 500);
    let scope = {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
        layout: 'layouts/error'
    };
    if (req && req.session && req.session.funcionario) {
        delete scope.layout;
    }
    res.json(scope);
});


module.exports = app;
