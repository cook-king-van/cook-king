import mongoose, { Schema } from 'mongoose';
const Cooking = new Schema({
  order: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  cookingImage: {
    type: Buffer,
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
const food = new Schema({
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
  foodName: {
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
  foodMedia: {
    type: [String],
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
  foodImage: {
    type: Buffer,
  },
  steps: {
    type: [Cooking],
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

const Food = mongoose.model('Food', food);
export default Food;