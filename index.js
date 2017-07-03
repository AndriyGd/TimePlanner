var express = require("express");
var db = require('./app/back/queries/queries');

var router = express.Router();
var db = require('./app/back/queries/queries');

app = express();

app.get('/api/tasks', db.getAllTasks);
app.get('/api/tasks/:id', db.getSingleTask);
app.post('/api/tasks', db.createTask);
app.put('/api/tasks/:id', db.updateTask);
app.delete('/api/tasks/:id', db.removeTask);


app.use(express.static(__dirname + "/app"));

app.listen(3000);
console.log("Server running on port 3000");