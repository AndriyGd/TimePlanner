var express = require("express");
var router = express.Router();

var repository = require('../queries/queries');

var db = new repository();

router.get('/api/tasks', db.getAllTasks);
router.get('/api/tasks/:id', db.getSingleTask);
router.post('/api/taskCreate', db.createTask);
router.put('/api/taskUpdate', db.updateTask);
router.delete('/api/tasks/:id', db.removeTask);
router.delete('/api/taskDelete/', db.removeTask);

router.get('/', (req, res) => {

    res.render('index', { title: 'Time Planner' });
});

module.exports = router;