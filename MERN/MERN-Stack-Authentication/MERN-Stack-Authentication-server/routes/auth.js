const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcrypt')  //hash password
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
// const { JWT_SECRET } = require('../config/keys')
// const requi
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // api_key: SENDGRID_API
        type: 'OAuth2',
        user: "ashikbhuyan.swe.diu@gmail.com",
        password: "24oct17nov.swe",
    }
})

router.get('/', (req, res) => {
    res.send("hello world")
})
router.get('/protected', requireLogin, (req, res) => {
    res.send("hello world")
})

router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 12, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.json({
                        error: err
                    })
                }
                // res.json({
                //     hash,
                //     original: req.body.password
                // })
                const user = new User({
                    email,
                    password: hash,
                    name,
                    pic
                })
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'user created successfully',
                            user: result
                        })
                    })
            });


            //another Way 
            // bcrypt.hash(password, 12)
            //     .then(hashedpassword => {
            //         const user = new User({
            //             email,
            //             password: hashedpassword,
            //             name,
            //             pic
            //         })

            //         user.save()
            //             .then(user => {
            //                 // transporter.sendMail({
            //                 //     to:user.email,
            //                 //     from:"no-reply@insta.com",
            //                 //     subject:"signup success",
            //                 //     html:"<h1>welcome to instagram</h1>"
            //                 // })
            //                 res.json({ message: "saved successfully" })
            //             })
            //             .catch(err => {
            //                 console.log(err)
            //             })
            //     })

        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message:"successfully signed in"})
                        const token = jwt.sign({ email: savedUser.email, _id: savedUser._id }, 'SECRET', { expiresIn: '240h' })
                        const { _id, name, email, followers, following, pic } = savedUser
                        // res.json({ token, user: { _id, name, email, followers, following, pic } })
                        res.json({
                            message: 'Login Successful',
                            tokenType: 'Bearer',
                            token, user: { _id, name, email }
                        })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})


router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        console.log(buffer);
        const token = buffer.toString("hex")
        console.log(token);
        console.log(req.body);
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User dont exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-replay@insta.com",
                        subject: "password reset",
                        html: `
                    <p>You requested for password reset</p>
                    `
                    }, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("email sent " + info.response);
                        }

                    })
                    res.json({ message: "check your email" })
                })

            })
    })
})


module.exports = router