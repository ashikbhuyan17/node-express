const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, 'SECRET', (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        // console.log(payload);
        const { _id } = payload
        User.findById(_id).then(userData => {
            // console.log(userData);
            req.user = userData
            next()
        })


    })
}