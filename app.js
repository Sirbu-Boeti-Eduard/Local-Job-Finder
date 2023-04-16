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

//Starting the app
app.listen(9000, ()=> {})

require('./query.js');