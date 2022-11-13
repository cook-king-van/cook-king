import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  name: {
    type: String,
    unique: true,
    requried: true,
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipes',
    },
  ],
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipes',
    },
  ], //1:N relation
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const User = mongoose.model('User', user);
export default User;
