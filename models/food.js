import mongoose, { Schema } from 'mongoose';
var Cooking = new Schema({
  order: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  cookingImage: {
    type: Buffer,
  },
  create_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  update_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
var Food = new Schema({
  userId: {
    type: Schema.type.ObjectId,
    ref: "User",
  },
  categoriesId: {
    type: [Schema.type.ObjectId],
    ref: "Categories",
  }, //N:M relation
  foodName: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    unique: true,
    default: undefined,
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
    default: undefined,
  },
  foodMedia: {
    type: [String],
  },
  option: {
    type: String,
    ref: "Option",
    default: "none",
  },
  foodImage: {
    type: Buffer,
  },
  steps: {
    type: [Cooking],
    default: undefined,
  },
  create_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  update_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
module.exports = mongoose.model("Food", Food);