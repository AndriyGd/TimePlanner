var express = require("express");
var bodyParser = require('body-parser');
var db = require('./app/back/queries/queries');

var router = express.Router();

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/app"));

app.get('/api/tasks', db.getAllTasks);
app.get('/api/tasks/:id', db.getSingleTask);
app.post('/api/tasks', db.createTask);
app.put('/api/tasks/:id', db.updateTask);
app.delete('/api/tasks/:id', db.removeTask);

app.listen(3000);
console.log("Server running on port 3000");