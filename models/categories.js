import mongoose, { Schema } from 'mongoose';

const categories = new Schema({
  categoriesName: {
    type: String,
    unique: true,
  },
  recipeList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipes',
    },
  ],
});

const option = new Schema({
  recipeId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipes',
    },
  ],
  sort: {
    type: String,
    enum: {
      values: ['brunch', 'snack', 'dinner', 'none'],
    },
    default: 'none',
  },
});

const Categories = mongoose.model('Categories', categories);
const Option = mongoose.model('Option', option);

export default { Categories, Option };
