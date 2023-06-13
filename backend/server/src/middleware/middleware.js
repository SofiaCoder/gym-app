const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkAuthentication = function checkAuthentication(req, res, next) {
    const { authKey } = req.cookies

    if (!authKey) {
        res.status(401).send('Missing authentication token')
        return;
    }
    try {
        const authKeyDecoded = jwt.verify(authKey, process.env.JWT_SECRET)
        const { id, username } = authKeyDecoded
        req.userID = id
        req.username = username
        res.status(200)
        next()
    }
    catch(error) {
        res.status(401).send('Not authorized, wrong token' + error);
    }
}