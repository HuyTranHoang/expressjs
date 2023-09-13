import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expressjs'
})

connection.connect((err) => {
    if (err) console.log('Kết nối CSDL không thành công')
})

export default connection