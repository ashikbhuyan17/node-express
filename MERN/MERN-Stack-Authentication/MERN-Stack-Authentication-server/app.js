const express = require('express')
const route = express.Router()
const app = express()
const port = 5000

//middleware
const cors = require('cors')
const morgan = require('morgan')

// mongoose for database
const mongoose = require('mongoose');

// parse application/json
// app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// database collection
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/auth', {    //contacts-db => documents     and table = collection
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log("database connection done  ");
})




require('./models/user')
require('./models/post')

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


// if (process.env.NODE_ENV == "production") {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


//server 
app.listen(5000, () => {
    console.log("listing on port 5000 ");
})