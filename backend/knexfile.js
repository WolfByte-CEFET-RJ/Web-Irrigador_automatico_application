require('dotenv').config();

module.exports = {

    development: {
        client: "mysql2",
        connection: {
            database: process.env.DB_NAME,
            host:process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            tableName: "migrations",
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}