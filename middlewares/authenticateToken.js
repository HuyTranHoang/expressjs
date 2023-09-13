import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.redirect('/login')
        // You can also use res.status(401).json({error: 'Không có token. Bạn chưa đăng nhập.'});
    }

    jwt.verify(token, 'sss', (err, user) => {
        if (err) {
            return res.redirect('/login')
            // You can also use res.status(403).json({error: 'Token không hợp lệ.'});
        }
        req.user = user
        // res.locals.username = req.user ? req.user.username : null
        next()
    })
}

export default authenticateToken
