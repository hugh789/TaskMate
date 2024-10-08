const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'category' });  // Explicitly specify the collection name

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;
