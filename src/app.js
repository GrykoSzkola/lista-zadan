const express = require('express');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasksdb'
});

db.connect(err => {
  if (err) console.error('blad z baza:', err);
  else console.log('polaczona z baza danych.');
});

app.locals.db = db;

const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

module.exports = app; 
