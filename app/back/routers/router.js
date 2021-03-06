var express = require("express");
var router = express.Router();

var db = require('./app/back/queries/queries');

router.get('/api/tasks', db.getAllTasks);
router.get('/api/tasks/:id', db.getSingleTask);
router.post('/api/tasks', db.createTask);
router.put('/api/tasks/:id', db.updateTask);
router.delete('/api/tasks/:id', db.removeTask);

module.exports = router;