import prop from 'bluebird';
let promise = require('bluebird');

let options = {
    promiseLib: promise
};

let pgp = require('pg-promise')(options);
let connectionString = "postgres://localhost:5432/Planer";
let db = pgp(connectionString);

function getAllTasks() {
    console.log("Get all tasks");
}

function getSingleTask() {

}

function createTask() {

}

function updateTask() {

}

function deleteTask() {

}