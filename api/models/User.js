const mongoose = require('mongoose');
const {Schema} = mongoose;
const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  email: {type:String, unique:true},
  password: String,
  tokens: [String],
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;