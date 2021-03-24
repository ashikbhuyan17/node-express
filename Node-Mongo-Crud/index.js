const express = require('express')
const bodyParser = require('body-parser')

// mongoDb
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const uri = "mongodb+srv://organicUser:Xewypw5ViTUDIr79@cluster0.p0lzm.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')   // for send file
})
client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");  //client mongoDb sathe ekta connection toiry korbe thn database takhe database name and database collection nibe
    // console.log('database connected');
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                res.send('success')
            })
    })

    app.get('/products', (req, res) => {
        productCollection.find({})              //.limit(3)
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id);
        productCollection.deleteOne({
            _id: ObjectId(req.params.id)
            // status: "D"
        })
            .then((result) => {
                console.log(result);
            })
    })

    // client.close();
});
app.listen(3000)