const express = require('express')
const app = express()
const port = 5000
const hostname = '127.0.0.1'


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:ArabianHorse79@cluster0.p0lzm.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("burjAlArab").collection("bookings");
    // perform actions on the collection object
    console.log("success")
    client.close();
});

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`server is running successfully at http://${hostname}:${port}`))