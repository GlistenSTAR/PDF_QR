const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  meta_data:{},
  changedName: {
    type: String,
    required: true
  },
  originName: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  uploader : {
    type:String
  },
  create_at : {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('pdfs', PostSchema);
