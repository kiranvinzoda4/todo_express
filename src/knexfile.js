module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost', // Replace with your MySQL host
            user: 'kiran', // Replace with your MySQL username
            password: 'kiran', // Replace with your MySQL password
            database: 'express_todo', // Replace with your MySQL database name
        },
        migrations: {
            directory: './migrations',
        },
    },
};
