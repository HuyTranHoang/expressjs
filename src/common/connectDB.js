import mysql from 'mysql2/promise.js'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expressjs',
    waitForConnections: true,
    connectionLimit: 5, // Adjust this limit as needed
    queueLimit: 0,
})

export default pool