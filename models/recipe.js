import mongoose, { Schema } from 'mongoose';
const Step = new Schema({
  order: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  stepImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const Ingredient = new Schema({
  name: {
    type: String,
    default: '',
  },
  measure: {
    type: String,
    deafult: '',
  },
});

const recipes = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  categoriesId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  recipeName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  ingredient: {
    type: [Ingredient],
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: 'Tag',
  },
  recipeImage: {
    type: String,
  },
  steps: {
    type: [Step],
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  userLike: {
    type: Map,
    of: {
      type: Boolean,
      default: false,
    },
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Recipe = mongoose.model('Recipes', recipes);
export default Recipe;
