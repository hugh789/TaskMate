const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const CategorySchema = new Schema({
  _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
  name: { type: String, required: true, unique: true }
}, { collection: 'category' });  // Explicitly specify the collection name

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;