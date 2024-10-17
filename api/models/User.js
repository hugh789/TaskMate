const mongoose = require('mongoose');
const {Schema} = mongoose;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const UserSchema = new Schema({
  _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
  name: String,
  email: {type:String, unique:true},
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;