const password = process.env.DATABASE_PASSWORD;
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'pjsamuels',
    host: 'localhost',
    database: 'Notified',
    password:  password,
    port: 5432,
})

module.exports = pool;