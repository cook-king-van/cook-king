import mongoose, { Schema } from 'mongoose';

const categories = new Schema({
  categoriesName: {
    type: String,
  },
  foodList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

const option = new Schema({
  foodId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  sort: {
    type: String,
    enum: {
      values: ['best', 'brunch', 'snack', 'none'],
    },
    default: 'none',
  },
});

const Categories = mongoose.model('Categories', categories);
const Option = mongoose.model('Option', option);

export default { Categories, Option };
