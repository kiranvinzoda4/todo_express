/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {

    return knex.schema.createTable('users', function (table) {
        table.uuid('id').defaultTo(knex.raw('UUID()')).primary();
        table.string('name');
        table.string('email');
        table.string('password');
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
    return knex.schema.dropTable('users');
};
