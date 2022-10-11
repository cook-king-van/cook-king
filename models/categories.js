import mongoose, { Schema } from 'mongoose';

const categories = new Schema({
  categoriesName: {
    type: String,
  },
  foodList: {
    type: [Schema.Types.ObjectId],
    ref: 'Food',
  },
});

const option = new Schema({
  foodId: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
  },
  type: String,
  enum: {
    value: ['best', 'brunch', 'snack', 'none'],
  },
});

const Categories = mongoose.model('Categories', categories);
const Option = mongoose.model('Option', option);

export { Categories, Option };