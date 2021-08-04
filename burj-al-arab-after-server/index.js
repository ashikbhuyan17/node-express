const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000
require('dotenv').config()
app.use(cors())    //middleware
app.use(bodyParser.json())  //middleware
const MongoClient = require('mongodb').MongoClient;


const admin = require("firebase-admin");

const serviceAccount = require("./configs/burj-al-arab-auth-b83d9-firebase-adminsdk-81t1d-22e2b8f807.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: process.env.FIRE_DB
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p0lzm.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    app.post('/addBooking', (req, res) => {
        // res.send('POST request to the homepage')
        const newBooking = req.body

        bookings.insertOne(newBooking)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount > 0)
            })
        console.log(newBooking)
    })

    app.get('/bookings', (req, res) => {    //mongodb te ja ace ta read kora r jonno 
        // console.log(req.headers.authorization)
        const bearer = req.headers.authorization
        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1]
            console.log({ idToken })
            admin.auth().verifyIdToken(idToken)
                .then((decodedToken) => {
                    const tokenEmail = decodedToken.email;
                    const queryEmail = req.query.email
                    console.log({ tokenEmail, queryEmail })
                    if (tokenEmail = queryEmail) {
                        bookings.find({ email: queryEmail })  //bookings takhe data gulu pawar jonno
                            .toArray((err, documents) => {
                                res.status(200).send(documents);
                            })
                    } else {
                        res.status(401).send("unauthorized access")
                    }

                })
                .catch((error) => {
                    res.status(401).send("unauthorized access")
                });
        } else {
            res.status(401).send("unauthorized access")
        }

    })
});



// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port)




// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const port = 5000
// const app = express()

// const MongoClient = require('mongodb').MongoClient;

// app.use(cors())    //middleware
// app.use(bodyParser.json())  //middleware


// const uri = "mongodb+srv://arabian:ArabianHorse79@cluster0.p0lzm.mongodb.net/burjAlArab?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const bookings = client.db("burjAlArab").collection("bookings");
//     app.post('/addBooking', (req, res) => {
//         // res.send('POST request to the homepage')
//         const newBooking = req.body

//         bookings.insertOne(newBooking)
//             .then(result => {
//                 console.log(result)
//                 res.send(result.insertedCount > 0)
//             })
//         console.log(newBooking)
//     })
// });

// app.get('/bookings', (req, res) => {    //mongodb te ja ace ta read kora r jonno 
//     bookings.find({})  //bookings takhe data gulu pawar jonno
//         .toArray((err, documents) => {
//             res.send(documents)
//         })    // amra je result ta pabo ta array te convert korbo

// })

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port)