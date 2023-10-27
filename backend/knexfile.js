require('dotenv').config();

module.exports = {

    development: {
        client: "mysql2",
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT
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