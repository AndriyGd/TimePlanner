'use-strict'

let bodyParser = require('body-parser');
let jsonp = require('jsonp-express');
let express = require("express");
let favicon = require('serve-favicon');
let path = require('path');
let logger = require('morgan');
let routes = require('./app/back/routes/routes');

app = express();
app.enable('jsonp callback');
app.set("jsonp callback", true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(jsonp);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/app"));
app.use('/', routes);
app.use(favicon(path.join(__dirname, 'favicon.ico')))

//catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
})

//development error hadler
//will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.code || 500)
            .json({
                status: 'error',
                message: err
            });
    });
}

//production error handler
//no stacktraces leked to user
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: err
        });
});

app.get('/favicon.ico', function (req, res) {
    res.send(204);
});

app.listen(3000);
console.log("Server running on port 3000");

module.exports = app;