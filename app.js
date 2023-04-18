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

//Rendering
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/index", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})


//Starting the app
app.listen(9000, ()=> {})

require('./query.js');

//Session
const session = require('express-session');

app.use(session({
    secret: 'eduard',
    resave: false,
    saveUninitialized: true
}));


//Register
const bcrypt = require("bcryptjs");
//receive form values as json
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());

app.post("/register", (req, res) => {    
    const { username, passwd, passwd_cnf } = req.body;

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

            db.query('INSERT INTO user SET ?', {username: username, passwd: hashedPassword}, (error, result) => {
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
                // set user session and redirect to dashboard
                req.session.user = results[0];
                res.render('index', {
                    message_login: 'Log In succesful'
                })
            } else {
                res.render('login', {
                    message_login: 'Invalid credentials'
                });
            }
        }
    });
});