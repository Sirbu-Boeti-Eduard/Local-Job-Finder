const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv'); //to extract from .env
const path = require("path");
const fs = require('fs');

//Creating the app
const app = express();

//Database credentials
dotenv.config({path: '.env'});

const db = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
})

//Database connect
db.connect((error) => {
    if(error) {
        console.log("Failed connection " + error);
    }
    else{ 
        console.log("Successful connection");
    }
})

//HBS as default view
app.set('view engine', 'hbs');

//Absolute path of ./public
const publicDir = path.join(__dirname, './public');

//Serve static files from here
app.use(express.static(publicDir));

//Session
const session = require('express-session');

app.use(session({
    secret: 'eduard',
    resave: false,
    saveUninitialized: true
}));

//Rendering
app.get("/", (req, res) => {
    res.render("index", { 
        username: req.session.username,
        latitude: req.session.latitude,
        longitude: req.session.longitude,
    });
})

app.get("/index", (req, res) => {
    res.render("index", { 
        username: req.session.username,
        latitude: req.session.latitude,
        longitude: req.session.longitude,
    });
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/chat", (req, res) => {
    res.render("chat");
})

app.get("/post", (req, res) => {
    res.render("post");
})

//Starting the app
app.listen(9000, ()=> {})

//Updating Data

function requireQuery(){
    const q = require('./query.js');
    q.Query();
}

setInterval(requireQuery, 10000);


//Register
const bcrypt = require("bcryptjs");
//receive form values as json
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());

app.post("/register", (req, res) => {    
    const { username, passwd, passwd_cnf, lat, lng, fname, lname, address, CNP } = req.body;

    db.query('SELECT username FROM user WHERE username = ?', [username], async (error, results) => {
        if(error){
            console.log(error);
            res.render('register', {
                message_register: 'An error occurred while checking username availability'
            });
        } else if( results.length > 0 ) {
            res.render('register', {
                message_register: 'This username is already in use'
            });
        } else if(passwd !== passwd_cnf) {
            res.render('register', {
                message_register: 'Passwords do not match!'
            });
        } else {
            let hashedPassword = await bcrypt.hash(passwd, 8);

            db.query('INSERT INTO user SET ?', 
            {   
                username: username, 
                passwd: hashedPassword, 
                latitude: lat, 
                longitude: lng, 
                fname: fname, 
                lname: lname, 
                address: address,
                CNP: CNP
            }, (error, result) => {
                if(error) {
                    console.log(error);
                    res.render('register', {
                        message_register: 'An error occurred while registering the user'
                    });
                } else {
                    res.render('index', {
                        message_register: 'User registered!'
                    });
                }
            });
        }
     });
});

app.post("/login", (req, res) => {
    const { username, passwd } = req.body;

    db.query('SELECT * FROM user WHERE username = ?', [username], async (error, results) => {
        if(error){
            console.log(error);
            res.render('login', {
                message_login: 'An error occurred while fetching the user'
            });
        } else if( results.length == 0 ) {
            res.render('login', {
                message_login: 'Invalid credentials'
            });
        } else {
            let isPasswordMatch = await bcrypt.compare(passwd, results[0].passwd);
            if(isPasswordMatch){
 
                req.session.username = results[0].username;
                req.session.latitude = results[0].latitude;
                req.session.longitude = results[0].longitude;
                req.session.userID = results[0].id;

                res.render('index', {
                    message_login: 'Log In succesful',
                    username: req.session.username,
                    latitude: req.session.latitude,
                    longitude: req.session.longitude,
                })
            } else {
                res.render('login', {
                    message_login: 'Invalid credentials'
                });
            }
        }
    });
});

app.post("/post", (req, res) => {
    const { jobName, jobDescription } = req.body;
    const { latitude, longitude, userID } = req.session; 

    db.query('INSERT INTO job SET ?', 
            {   
                latitude: latitude,
                longitude: longitude,
                jobName: jobName,
                jobDescription: jobDescription,
                userID: userID

            }, (error, result) => {
                if(error) {
                    console.log(error);
                    res.render('post', {
                        message_post: 'An error occurred while posting a job'
                    });
                } else {
                    res.render('index', {
                        message_post: 'Job Posted!',
                        username: req.session.username,
                        latitude: req.session.latitude,
                        longitude: req.session.longitude,
                    });
                }
            });    

})

app.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/login');
        }
      });
})
