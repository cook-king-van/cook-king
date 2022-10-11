import mongoose, { Schema } from 'mongoose';

var Categories = new Schema({
  categoriesName: {
    type: String,
  },
  foodList: {
    type: [Schema.Types.ObjectId],
    ref: 'Food',
  },
});

var Option = new Schema({
  foodId: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
  },
  type: String,
  enum: {
    value: ['best', 'brunch', 'snack', 'none'],
  },
});
module.exports = mongoose.model('Categories', Categories);
module.exports = mongoose.model('Option', Option);
