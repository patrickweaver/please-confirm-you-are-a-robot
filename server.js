// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Robots (name TEXT)');
    console.log('New table Robots created!');
  }
  else {
    console.log('Database "Robots" ready to go!');
    db.each('SELECT * from Robots', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

app.get('/get-robots', function(req, res) {
  db.all('SELECT * from Robots', function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get('/new-robot', function(req, res) {
  if (req.query.name) {
    db.serialize(function() {
      db.run('INSERT INTO Robots (name) VALUES ("' + req.query.name + '")');
      res.redirect('/');
    });
  } else {
    res.send({"error": "No name"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
