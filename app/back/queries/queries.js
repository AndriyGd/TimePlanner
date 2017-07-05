let promise = require('bluebird');

let options = {
    promiseLib: promise
};

let pgp = require('pg-promise')(options);
let connectionString = "postgres://postgres:ksp.m21d77@localhost:5432/planner";
let db = pgp(connectionString);

function dateTimeReviver(value) {
    var a;
    if (typeof value === 'string') {
        a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
            return new Date(+a[1]);
        }
    }
    return value;
}

class TaskRepository {
    getAllTasks(req, res, next) {
        db.any('select * from tasks')
            .then(data => {
                res.status(200)
                    .json(data);
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
        var obj = {};
        console.log(req.query);
        console.log(req.body);
        var data = JSON.parse(req.body.models);
        var task = data[0];
        //var task = req.body;
        var dtStart = dateTimeReviver(task.Start);
        var dtEnd = dateTimeReviver(task.End);
        var taskParams = [task.OwnerID, task.Title, task.Description, task.StartTimezone, dtStart, dtEnd,
            task.EndTimezone, task.RecurrenceRule, task.RecurrenceID, task.RecurrenceException, task.IsAllDay
        ];
        //console.log(taskParams);
        db.none('insert into tasks ("OwnerID", "Title", "Description", "StartTimezone", ' +
                '"Start", "End", "EndTimezone", "RecurrenceRule", "RecurrenceID", "RecurrenceException", "IsAllDay")' +
                'values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', taskParams)
            .then(() => {
                res.status(200).send(req.query.callback + '(' + JSON.stringify(obj) + ');');
            })
            .catch(err => {
                return next(err);
            });
    }
    createTaskT(req, res, next) {
        //var testJSON = JSON.parse(req.body);
        //console.log(req.body.Title);
        console.log(req.body);
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