\c todolist

DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    todo VARCHAR (255) NOT NULL
);