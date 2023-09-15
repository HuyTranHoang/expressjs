import jwt from 'jsonwebtoken'

function getUsername(req, res, next) {
    const token = req.cookies.token
    jwt.verify(token, 'sss', (err, user) => {
        res.locals.username = user ? user.username : null
    })
    next()
}

export default getUsername