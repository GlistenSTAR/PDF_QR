const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  meta_data:{}
});

module.exports = mongoose.model('pdfs', PostSchema);
