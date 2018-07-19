const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'other',
  },
  active: {
    type: Boolean,
    default: true
  }
});
BookSchema.plugin(autoIncrement.plugin, { model: 'Book', field: 'id' });

module.exports = mongoose.model('Book', BookSchema);
