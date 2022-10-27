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
const recipes = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  categoriesId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
    },
  ], //N:M relation
  recipeName: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    unique: true,
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
    type: [String],
    unique: true,
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
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
});

const Recipe = mongoose.model('Recipes', recipes);
export default Recipe;