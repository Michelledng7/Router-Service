const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    console.log(`req.user: ${ req.user }`)
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.status(401)
    console.log(`authHeader ${authHeader}`)
    const token = authHeader.split(' ')[1] //[0] is Bearer
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid token Forbidden' })
            req.user = decoded.UserInfo.username,
            req.roles = decoded.UserInfo.roles,
            next()
        }
    )

}

module.exports = verifyJWT