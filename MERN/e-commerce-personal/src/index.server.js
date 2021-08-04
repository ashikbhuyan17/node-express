const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
    .connect('mongodb://localhost:27017/e-commerce-personal',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log("Database connected");
    });


//routes


// app uses
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'))



const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}! `))