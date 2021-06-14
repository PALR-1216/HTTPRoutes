const mysql = require("mysql");
const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended:false});

const directory = path.join(__dirname, './public')
app.use(express.static(directory));


//create connection
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root',
    database:'Test',
    port:8889
})


//connect db
db.connect((err, rows) =>{
    if(err) {
        throw err;
    }
    console.log("mysql connected");
})

app.get('/', (req, res) =>{
    res.send("hello world");
})

app.post('/add', urlencodedParser, (req,res) =>{
    res.send(`las horas son: ${req.body.hours}`)
    var str = 'INSERT INTO `MyHours`(`horas`) VALUES (' + req.body.hours + ');';
    db.query(str, (err,result) =>{
        if (err) throw err;
        res.send(result);
    })  
})




app.post('/show', (req,res) =>{
    var str = 'SELECT * FROM `MyHours`';
    db.query(str , (err, result) =>{
        if (err) throw err;
        res.send(result);
    })
})




app.listen('3000' , () =>{
    console.log("Server Running");
})

