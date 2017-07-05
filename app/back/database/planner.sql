DROP DATABASE IF EXISTS planner;
DROP TABLE public.tasks;
DROP TABLE public.owners;

CREATE TABLE owners(
    "OwnerID" SERIAL PRIMARY KEY,
    "Name" VARCHAR    
);

CREATE TABLE tasks(
    "TaskID" SERIAL PRIMARY KEY,
    "OwnerID" INTEGER REFERENCES owners("OwnerID"),
    "Title" VARCHAR,
    "Description" VARCHAR,
    "StartTimezone" VARCHAR,
    "Start" date,
    "End" date,
    "EndTimezone" VARCHAR,
    "RecurrenceRule" VARCHAR,
    "RecurrenceID" VARCHAR,
    "RecurrenceException" VARCHAR,
    "IsAllDay" BOOLEAN
);