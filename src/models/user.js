import db from '../common/connectDB.js'

class User {
    async checkLogin(user) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE username = "${user.username}" AND password = "${user.password}"`
            db.query(sql, (err, results) => {
                if (err) {
                    console.log('Lỗi khi query - checkLogin User' + err)
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
}

export default new User