let promise = require('bluebird');
let options = {
    promiseLib: promise
};

let pgp = require('pg-promise')(options);
let connectionString = "postgres://postgres:ksp.m21d77@localhost:5432/planner";
const db = pgp(connectionString);

function dateTimeReviver(value) {
    var a;
    if (typeof value === 'string') {
        a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
            return new Date(+a[1]);
        }
    }
    return new Date(value);
}

class TaskRepository {
    getAllTasks(req, res, next) {
        db.any('select "TaskID", "Start", "End", "StartTimezone", "EndTimezone","Title", "Description", "RecurrenceID", "RecurrenceRule",  "RecurrenceException", "OwnerID", "IsAllDay"  from tasks')
            .then(data => {
                //console.log(data);
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
        var data = JSON.parse(req.body.models);
        var task = data[data.length - 1];
        task.Start = new Date(task.Start);
        task.End = new Date(task.End);
        var taskParams = [task.OwnerID, task.Title, task.Description, task.StartTimezone, task.Start, task.End,
        task.EndTimezone, task.RecurrenceRule, task.RecurrenceID, task.RecurrenceException, task.IsAllDay];
        db.one('insert into tasks ("OwnerID", "Title", "Description", "StartTimezone", ' +
            '"Start", "End", "EndTimezone", "RecurrenceRule", "RecurrenceID", "RecurrenceException", "IsAllDay")' +
            'values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING "TaskID"', taskParams)
            .then((data) => {
                task.TaskID = data.TaskID;
                res.status(200).send(req.query.callback + '(' + JSON.stringify(task) + ');');
            })
            .catch(err => {
                return next(err);
            });
    }

    updateTask(req, res, next) {
        var data = JSON.parse(req.body.models);
        var task = data[data.length - 1];
        task.Start = new Date(task.Start);
        task.End = new Date(task.End);
        var taskParams = [task.OwnerID, task.Title, task.Description, task.StartTimezone, task.Start, task.End,
        task.EndTimezone, task.RecurrenceRule, task.RecurrenceID, task.RecurrenceException, task.IsAllDay, task.TaskID];

        db.none('update tasks set "OwnerID" = $1, "Title" = $2, "Description" = $3, "StartTimezone" = $4, "Start" = $5, "End" = $6, ' +
            '"EndTimezone" = $7, "RecurrenceRule" = $8, "RecurrenceID" = $9, "RecurrenceException" = $10, "IsAllDay" = $11 where "TaskID" = $12', taskParams)
            .then(() => {
                res.status(200).send(req.query.callback + '(' + JSON.stringify(task) + ');');
            })
            .catch(err => {
                return next(err);
            });
    }

    removeTask(req, res, next) {
        var data = JSON.parse(req.body.models);
        var taskDelete = data[data.length - 1];
        // console.log();
        // console.log(`Data: ${data}`);
        // console.log(`Length data: ${data.length}`);
        // console.log(`TaskId: ${taskDelete.TaskID}`);
        let taskId = taskDelete.TaskID;
        //console.log(taskId);
        db.result('delete from tasks where "TaskID"= $1', taskId)
            .then(result => {
                res.status(200).send(req.query.callback + '(' + JSON.stringify(taskDelete) + ');');
            })
            .catch(err => {
                return next(err);
            });
    }
}

module.exports = TaskRepository;