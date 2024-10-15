const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, ref: 'Category', required: true } // Reference to Category
});

const ServicesModel = mongoose.model('Services', ServicesSchema);
module.exports = ServicesModel;
