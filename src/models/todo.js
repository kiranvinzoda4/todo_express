const knex = require("../config/config");
const table = "todos";

const insertTodo = (data) => {
    return knex(table).insert(data);
};

const updateTodo = (id, data) => {
    return knex(table).where({ id: id }).update(data);
};

const deleteTodo = (id) => {
    return knex(table).where({ id: id }).update({ is_deleted: true });
};

const getTodos = () => {
    return knex.select("*").where({ is_deleted: false }).from(table);
};

const getTodosByUser = (user_id) => {
    return knex.select("*").where({ is_deleted: false }).where({ user_id: user_id }).from(table);
};

const getTodo = (id) => {
    return knex(table).select("*").where({ id: id }).first();
};

const getTodoByIdWithUser = (id, user_id) => {
    return knex(table).select("*").where({ id: id }).where({ user_id: user_id }).first();
};

module.exports = {
    insertTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodo,
    getTodosByUser,
    getTodoByIdWithUser,
};
