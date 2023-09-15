import jwt from 'jsonwebtoken'
import modelUser from '../models/user.js'

class LoginController {
    // [GET] - /login
    index(req, res) {
        const isFailed = req.query.isFailed === 'true'
        res.render('login', {title: 'Login', isFailed: isFailed})
    }

    // [POST] - /login
    login(req, res) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        modelUser.checkLogin(user)
            .then((results) => {
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
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Internal Server Error')
            })
    }

    // [GET] - /logout
    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/?lo=true')
    }
}

export default new LoginController