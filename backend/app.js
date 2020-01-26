const express = require('express')
const app = express();
const moment = require('moment');
const user = require('./routes/user')
const bodyParser = require('body-parser');


app.use(express.json())
app.use(bodyParser.json({
    limit: '50mb'
}));

app.get('/', async (req, res) => {
  res.send('HELLO WORLD!!')
})
app.use('/user', user)

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
