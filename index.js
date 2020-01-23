const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ebook_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//tampilkan semua data product
app.get('/api/tari',(req, res) => {
  let sql = "SELECT * FROM tari";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.send({"status": 200, "error": null, "response": results});
  });
});
 
//tampilkan data product berdasarkan id
app.get('/api/tari/:id',(req, res) => {
  let sql = "SELECT * FROM tari WHERE idsoal="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send({"status": 200, "error": null, "response": results});
  });
});
 
//Tambahkan data product baru
app.post('/api/tari',(req, res) => {
  let data = {
    soal: req.body.soal, 
    optiona: req.body.optiona,
    optionb: req.body.optionb,
    optionc: req.body.optionc,
    optiond: req.body.optiond,
    answer: req.body.answer
  };
  console.log(req.body)

  let sql = "INSERT INTO tari SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send({"status": 200, "error": null, "response": "Sukses menambahkan soal"});
  });
});
 
//Edit data product berdasarkan id
app.put('/api/tari/:id',(req, res) => {
  let sql = "UPDATE tari SET soal='"+req.body.soal+"', optiona='"+req.body.optiona+"', optionb='"+req.body.optionb+"', optionc='"+req.body.optionc+"', optiond='"+req.body.optiond+"', answer='"+req.body.answer+"' WHERE idsoal="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send({"status": 200, "error": null, "response": results});
  });
});
 
//Delete data product berdasarkan id
app.delete('/api/tari/:id',(req, res) => {
  let sql = "DELETE FROM tari WHERE idsoal="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send({"status": 200, "error": null, "response": results});
  });
});
 
//Server listening
app.listen(4000,() =>{
  console.log('Server started on port 3000...');
});