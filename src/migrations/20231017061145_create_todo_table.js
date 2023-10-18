/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    const { v4: uuidv4 } = require('uuid');
    return knex.schema.createTable('todos', function (table) {
        table.uuid('id').defaultTo(knex.raw('UUID()')).primary();
        table.string('title');
        table.string('desc');
        table.string('image');
        table.uuid('user_id') // Foreign key column
        table.foreign('user_id').references('id').inTable('users');
        table.boolean('is_deleted').defaultTo(false);
        table.date('created_at').defaultTo(knex.fn.now());
        table.date('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('todos');
};
