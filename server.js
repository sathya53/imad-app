var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var config=(
    user: 'sathyanarayananmail',
    database: 'sathyanarayananmail',
    host:'sathyanarayananmail',
    port:'5432',
    password:process.env.DB_PASSWORD
    );


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

var pool= new pool(config);
app.get('/test-db', function (req, res) {
 pool.query('select * from employee',function(err,result)) {

    if (err){
    res.status(500).send(err.tostring())
    }
    else
    {
    res.send(JSON.stringfy(result))
    }
});
});
    
app.get('/article-two', function (req, res) {
  res.send('This the call to Article Two');
});

app.get('/article-three', function (req, res) {
  res.send('This the call to Article Three');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
