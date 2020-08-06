var express = require('express')
var app = express()
var http = require('http').createServer(app)
var bodyParser = require('body-parser')
var mysql = require('mysql');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.set('views', 'views')
// app.set('view engine', 'hbs')

// configurasi database
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'belajar-nodejs'
})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")	
})

app.get('/api/perizinan', (req, res)=>{
	let data = {
		nim : req.query.nim,
		status : req.query.status
	}
	let sql = "INSERT INTO izin SET ?"
	let query = db.query(sql, data,(err, results)=>{
		if(err) throw err
		res.send('data behasil dimasukan')
	})
})

app.get('/home',(req, res)=>{
	let sql = "SELECT * FROM izin"
	const query = db.query(sql, (err, results)=>{
		if(err) throw err
		res.send(results)
	})
}) 



http.listen(3000, ()=>{
	console.log('server is running on PORT 3000');
})