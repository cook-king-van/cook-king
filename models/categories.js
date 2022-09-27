import mongoose, { Schema } from 'mongoose';

var Categories = new Schema({
  category_name: {
    type: String
  },
  food_list: {
    type: [Shema.type.ObjectId],
    ref: 'Food'
  },
});

var Option = new Schema({
  food_id: {
    type: Shema.type.ObjectId,
    ref: 'Food'
  },
  type: String,
  enum: {
    value: ['best', 'brunch', 'snack', 'none'],
    message: '{Value} is not Categories',
  },
});
module.exports = mongoose.model('Categories', Categories);
module.exports = mongoose.model('Option', Option);
