#!/usr/bin/env nodejs

const DB = 'mongodb://localhost:27018/books'
const PORT = process.env.PORT || 3000;

const express = require('express');
const mongoose = require('mongoose');
const mongooseAutoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
const connection = mongoose.createConnection(DB);
mongooseAutoIncrement.initialize(connection);
mongoose.connect(DB);

const Book = require('./models/book');
const bodyParser = require('body-parser');
const books = require('./controllers/books');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/books')
  .get(books.searchBooks)
  .post(books.createABook);

app.route('/books/:id')
  .get(books.readABook)
  .put(books.updateABook)
  .delete(books.deleteABook);


app.listen(PORT);

console.log('Server started on: ' + PORT);
