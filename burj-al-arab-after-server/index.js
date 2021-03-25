const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000
const hostname = '127.0.0.1'
const app = express()

app.use(cors())    //middleware
app.use(bodyParser.json())  //middleware


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:ArabianHorse79@cluster0.p0lzm.mongodb.net/burjAlArab?retryWrites=true&w=majority";
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
});

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server is running successfully at http://${hostname}:${port}`))