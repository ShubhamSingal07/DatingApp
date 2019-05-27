const jwt = require('jsonwebtoken')

const JWT_SECRET = 'hfd972fh5bfsdhrthf+hfh220ges'

const createJWT = user => {
    const token = jwt.sign(user, JWT_SECRET)
    return token
}

const verifyJWT = token => {
    const user = jwt.decode(token, JWT_SECRET)
    return user
}

module.exports = {
    createJWT,
    verifyJWT
}