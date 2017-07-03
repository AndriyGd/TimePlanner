DROP DATABESE IF EXISTS palenner;
CREATE DATABASE palenner;

CREATE TABLE tasks(
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    breed VARCHAR,
    age INTEGER,
    sex VARCHAR
)

INSERT INTO tasks(name, breed, age, sex)
    VALUES('Oleg', 'Retrieved', 19, 'M');