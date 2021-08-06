var mysql = require('mysql')
const SECRET_KEY = "secretkey"
const axios = require ('axios');
const util = require('util');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yanai'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn")
    }else {
        console.log("Error connecting ... nn")
    }
});

exports.uploads = async function(req, res, next) {
    var book = {
     title: req.body.title,
     author: req.body.author,
     description: req.body.descr,
     price: req.body.price,
     cover_url: req.files[1].filename,
     pdf_url: req.files[0].filename,
     audio_url: req.files[2].filename,
     date_added: new Date()
    }
 
    console.log(req.files);
    connection.query('INSERT INTO books SET ?', book, function(error, results, fields) {
        if(error) {
            console.log(error);
        } else {
            res.send({
                "code": 200,
                "error": false
            });
        }
    });
}


exports.books = function(req, res) {
    connection.query('SELECT * FROM books', function(error, results, fields) {
        if(error) {
            console.log(error);
        }else {
            res.send({
                "books": results
            });
        }
    });
}