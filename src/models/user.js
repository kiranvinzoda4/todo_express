const knex = require("../config/config");
const table = "users";

const insertUser = (data) => {
    return knex(table).insert(data);
};

const updateUser = (id, data) => {
    return knex(table).where({ id: id }).update(data);
};

const deleteUser = (id) => {
    return knex(table).where({ id: id }).update({ is_deleted: true });
};

const getUsers = () => {
    return knex.select("*").where({ is_deleted: false }).from(table);
};

const getUser = (id) => {
    return knex(table).select("*").where(id).first();
};

const getUserByEmail = (email) => {
    return knex(table).select("*").where({ email: email }).first();
};

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    getUserByEmail
};
