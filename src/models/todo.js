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
    return knex.select("todos.*, users.id, users.name").from(table)
        .innerJoin('users', 'todos.user_id', 'users.id').where({ is_deleted: false });
};

const getTodosByUser = async (user_id) => {
    try {
        const rows = await knex
            .select('todos.id as todo_id', 'todos.updated_at', 'todos.created_at', 
            'todos.image', 'todos.desc', 'todos.title', 'users.id as user_id', 
            'users.name as user_name')
            .from('todos')
            .innerJoin('users', 'todos.user_id', 'users.id')
            .where('todos.is_deleted', false)
            .andWhere('users.id', user_id);

        return rows; // Return the result of the query
    } catch (error) {
        throw error;
    }
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
