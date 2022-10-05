import mongoose, { Schema } from 'mongoose';

var User = new Schema({
  // name: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  likeFood: {
    type: [Schema.type.ObjectId],
    ref: 'Food',
    default: undefined,
  }, //1:N relation
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
module.exports = mongoose.model('User', User);
