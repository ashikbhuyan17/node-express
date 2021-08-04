const express = require("express") //import kora holo express ke and ey express amader ke ekta function return kore
const app = express()  //express function theke app object ke niye asa holo and ey app object amadr ke sokol doroner benefit, convenience dey

app.use(express.json()) //parcer
// application ta kon function use korbe ta bole dewa => 
//client req er body modhe ja patabe ta jody json hoi thle ami ey pas theke json akare parse korthe parbo express.json() er madhome


//express.static
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(`${__dirname}/public/`, {
    index: 'home.html'  //options object => http://localhost:5000/text/
}))
app.set('title', 'My Site')
app.get('/', (req, res) => {
    // user jody get request kore / url e thle 2nd parameter hisebe je call back function dicci se function t call kore dew  and 
    // call back function ta 2ta object or parameter declare kore req,res

    res.send(app.get('title') + " home page")

})

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(typeof (req.body));
    console.log((req.body.name));
    res.send("this is home page")
})

app.param('id', (req, res, next, id) => {  // middleware function 
    console.log('CALLED ONLY ONCE');
    const user = {
        userId: id,
        name: "BD"
    }
    req.UserDetails = user
    next();
});

app.get('/user/:id', (req, res) => {
    res.send(req.UserDetails)

})


//app.route() 
// =>The app.route() function returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
// Use app.route() to avoid duplicate route names (and thus typo errors).
app.route('/person')
    .get((req, res, next) => {
        res.send('GET request called');
    })
    .post((req, res, next) => {
        res.send('POST request called');
    })
    .all((req, res, next) => {
        res.send('Other requests called');
    })


// app.engine() => age amra json,text,file response kortham bt ekn  template response korbe jehetu eta mvc patten follow kore
app.set('view engine', 'ejs')
app.get('/about', (req, res) => {
    res.render('pages/about')
})

app.listen(5000, () => {
    console.log("listing on port 5000 ");
})
