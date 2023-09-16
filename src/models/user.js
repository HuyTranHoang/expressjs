import pool from '../common/connectDB.js'

class User {
    static checkLogin = async (user) => {
        const {username, password} = user
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'

        try {
            const [rows] = await pool.query(sql, [username, password])
            return rows
        } catch (err) {
            console.error('Lỗi khi query - checkLogin User')
            throw err
        }
    }
}

export default User