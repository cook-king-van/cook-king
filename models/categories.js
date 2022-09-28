import mongoose, { Schema } from 'mongoose';

var Categories = new Schema({
  categoriesName: {
    type: String,
  },
  foodList: {
    type: [Schema.type.ObjectId],
    ref: 'Food',
  },
});

var Option = new Schema({
  foodId: {
    type: Schema.type.ObjectId,
    ref: 'Food',
  },
  type: String,
  enum: {
    value: ['best', 'brunch', 'snack', 'none'],
    message: '{Value} is not Categories',
  },
});
module.exports = mongoose.model('Categories', Categories);
module.exports = mongoose.model('Option', Option);
