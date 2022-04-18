const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()
const PrivateKey = process.env.PrivateKey

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(400).send({
        message: "There is error in Token"
    })

    jwt.verify(token, PrivateKey, (err, user) => {
        if (err) return res.status(400).send({
            message: "There is some error in token"
        })
        next()
    })

}