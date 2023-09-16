import jwt from 'jsonwebtoken'
import modelUser from '../models/user.js'

class LoginController {
    // [GET] - /login
    static index(req, res) {
        const isFailed = req.query.isFailed === 'true'
        res.render('login', {title: 'Login', isFailed: isFailed})
    }

    // [POST] - /login
    static login = async (req, res, next) => {

        const {username, password} = req.body
        const user = {username, password}

        try {
            const results = await modelUser.checkLogin(user)

            if (results && results.length > 0) {
                const rsUser = results[0]
                const token = jwt.sign({userId: rsUser.id, username: rsUser.username}, 'sss', {
                    expiresIn: '1h' // Thời hạn của token (ví dụ: 1 giờ)
                })
                res.cookie('token', token, {httpOnly: true})
                res.redirect('/?li=true')
            } else {
                res.redirect('/login?isFailed=true')
            }
        } catch (err) {
            next(err)
        }

    }

    // [GET] - /logout
    static logout(req, res) {
        res.clearCookie('token')
        res.redirect('/?lo=true')
    }
}

export default LoginController