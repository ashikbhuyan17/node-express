const http = require('http');
const port = 3000;
const hostname = '127.0.0.1'

const myServer = http.createServer((req,res)=>{
    res.end("<h1>Hello </h1>");
});

myServer.listen(port, hostname, ()=>{
    console.log(`server is running successfully at http://${hostname}:${port}`);
});


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))