const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.listAllBooks = (req, res) => {
  Book.find(
    {},
    {'_id': 0, '__v': 0},
    function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    }
  );
};

exports.createABook = (req, res) => {
  const newBook = new Book(req.body);
  newBook.save(function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};

exports.readABook = (req, res) => {
  Book.findOne({'id': req.params.id}, {'_id': 0, '__v': 0}, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};

exports.updateABook = (req, res) => {
  Book.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};

exports.deleteABook = (req, res) => {
  Book.remove({
    id: req.params.id
  }, function(err, book) {
    if (err)
      res.send(err);
    res.json({ success: true });
  });
};

exports.searchBooks = (req, res) => {
  if (req.query.title) {
    let qt = '(.*)'+req.query.title+'(.*)';
    console.log(qt);
    Book.find(
      {'title': {'$regex':qt}},
      {},
//      {'_id': 0, '__v': 0},
//      {'title':1, 'authors':1,'description':1},
      function(err, task) {
       if (err) {
        console.log(qt);
        res.send(err);
       }
       res.json(task);
      }
    );
  } else {
    this.listAllBooks(req, res);
  }
};

