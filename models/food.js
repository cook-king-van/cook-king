import mongoose, { Schema } from 'mongoose';
var Cooking = new Schema({
  order: { type: Number, default: 0 },
  description: { type: String, default: '', },
  image: { type: Buffer, },
  create_at: { type: Date, required: true, default: () => Date.now(), },
  update_at: { type: Date, requried: true, default: () => Date.now(), },
});
var Food = new Schema({
  user_id: { type: Schema.type.ObjectId, ref: 'User' },
  categories_id: { type: [Schema.type.ObjectId], ref: 'Categories' }, //N:M relation
  food_name: { type: String, requried: true },
  tag: { type: [String], unique: true, default: undefined },
  size: { type: Number, requried: ture },
  time: { type: Number, requried: ture },
  ingredient: { type: [String], unique: true, default: undefined },
  food_media: { type: [String] },
  option: { type: String, ref: 'Option', default: 'none' },
  image: { type: Buffer },
  steps: {
    type: [Cooking],
    default: undefined,
  },
  create_at: { type: Date, required: true, default: () => Date.now() },
  update_at: { type: Date, requried: true, default: () => Date.now() },
});
module.exports = mongoose.model('Food', Food);
