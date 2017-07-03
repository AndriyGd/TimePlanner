var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:ksp.m21d77@localhost:5432/planner";
var db = pgp(connectionString);

function getAllTasks(req, res, next) {
    db.any('select * from tasks')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved All tasks'
                });
        }).catch(function(err) {
            return next(err);
        });
}

function getSingleTask() {

}

function createTask() {

}

function updateTask() {

}

function removeTask() {

}


module.exports = {
    getAllTasks: getAllTasks,
    getSingleTask: getSingleTask,
    createTask: createTask,
    updateTask: updateTask,
    removeTask: removeTask
};