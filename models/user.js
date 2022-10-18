import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  name: {
    type: String,
    unique: true,
    requried: true,
  },
  FoodLists: [{
    type: Schema.Types.ObjectId,
    ref: 'Food',
  }],
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
  likeFood: [{
    type: Schema.Types.ObjectId,
    ref: 'Food',
  }], //1:N relation
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const User = mongoose.model('User', user);
export default User;