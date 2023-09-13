import db from '../common/connectDB.js'
import jwt from 'jsonwebtoken'

class LoginController {
    // [GET] - /login
    index(req, res) {
        const isFailed = req.query.isFailed === 'true'
        res.render('login', {title: 'Login', isFailed: isFailed})
    }

    // [POST] - /login
    login(req, res) {
        const sql = `SELECT * FROM users WHERE username = "${req.body.username}" AND password = "${req.body.password}"`
        db.query(sql, (err, results) => {
            if (err) console.log('Lỗi khi query' + err)
            if (results && results.length > 0) {
                const user = results[0]
                const token = jwt.sign({userId: user.id, username: user.username}, 'sss', {
                    expiresIn: '1h' // Thời hạn của token (ví dụ: 1 giờ)
                })
                res.cookie('token', token, {httpOnly: true})
                res.redirect('/?li=true')
            } else {
                res.redirect('/login?isFailed=true')
            }
        })
    }

    // [GET] - /logout
    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/?lo=true')
    }
}

export default new LoginController