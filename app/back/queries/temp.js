let promise = require('bluebird');

let options = {
    promiseLib: promise
};

let pgp = require('pg-promise')(options);
let connectionString = "postgres://postgres:ksp.m21d77@localhost:5432/planner";
let db = pgp(connectionString);

class TaskRepository {
    getAllTasks(req, res, next) {
        console.log('get all');

        db.any('select * from tasks')
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrieved All tasks'
                    });
            }).catch(err => {
                return next(err);
            });
    }

    getSingleTask(req, res, next) {
        let taskId = parseInt(req.params.id);
        db.one('select * from tasks where id = $1', taskId)
            .then(data => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrived ONE task'
                    });
            })
            .catch(err => {
                return next(err);
            });
    }

    createTask(req, res, next) {
        db.none('insert into tasks (name, breed, age, sex)' +
                'values(${name}, ${breed}, ${age}, ${sex})', req.body)
            .then(() => {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted one task'
                    });
            })
            .catch(err => {
                return next(err);
            });
    }
    updateTask(req, res, next) {
        db.none('update tasks set name = $1, breed = $2, age = $3, sex = $4 where id = $5', [req.body.name, req.body.breed, req.body.age, req.body.sex, parseInt(req.params.id)])
            .then(() => {
                res.status(200)
                    .json({
                        status: "success",
                        message: "Update task"
                    });
            })
            .catch(err => {
                return next(err);
            });
    }

    removeTask(req, res, next) {
        let taskId = parseInt(req.params.id);
        db.result('delete from tasks where id = $1', taskId)
            .then(result => {
                res.status(200)
                    .json({
                        status: "success",
                        message: `Removed ${result.rowCount} tasks`
                    });
            })
            .catch(err => {
                return next(err);
            });
    }
}

module.exports = TaskRepository;