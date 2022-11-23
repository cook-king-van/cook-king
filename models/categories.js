import mongoose, { Schema } from 'mongoose';

const categories = new Schema({
  categoriesName: {
    type: String,
    enum: {
      values: ['asian', 'american', 'european', 'african', 'none'],
    },
    default: 'none',
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

const tag = new Schema({
  recipeId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipes',
    },
  ],
  tagName: { type: String, required: true },
});

const Categories = mongoose.model('Categories', categories);
const Option = mongoose.model('Option', option);
const Tag = mongoose.model('Tag', tag);

export default { Categories, Option, Tag };
