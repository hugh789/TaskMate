const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const ServicesSchema = new Schema({
    _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, ref: 'Category', required: true },  // Reference to Category
    price: { type: Number, required: true },  // New field for price
});

const ServicesModel = mongoose.model('Services', ServicesSchema);
module.exports = ServicesModel;
