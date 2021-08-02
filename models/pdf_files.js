const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  meta_data:{},
  title: {
    type: String
  },
  description: {
    type: String
  },
  uploader : {
    type:String
  },
  changedName : {
    type:String
  },
  create_at : {
      type: Date,
      default: Date.now
  },
  views : {
    type:Number,
    default: 0
  }
});

module.exports = mongoose.model('pdfs', PostSchema);
