const express = require('express')
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:Xewypw5ViTUDIr79@cluster0.p0lzm.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')   // for send file
})
client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");
    // console.log('database connected');
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                res.send('success')
            })
    })

    // client.close();
});
app.listen(3000)