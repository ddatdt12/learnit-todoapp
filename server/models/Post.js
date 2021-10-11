const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter title of post'],
  },
  description: { type: String },
  url: String,
  status: {
    type: String,
    enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    default: 'TO LEARN',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', PostSchema);
