import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const token = req.cookies.token

    jwt.verify(token, 'sss', (err, user) => {
        if (err) {
            return res.redirect('/login')
            // You can also use res.status(403).json({error: 'Token không hợp lệ.'});
        }
        req.user = user
        next()
    })

}

export default authenticateToken
