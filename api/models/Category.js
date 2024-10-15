const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true }
}, { collection: 'category' });  // Explicitly specify the collection name

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;