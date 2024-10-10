const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', },  // Reference to Category
    categoryName: { type: String, required: true },  // Human-readable name
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Linked to the service provider
    price: { type: Number, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    rating: { type: Number, default: 0 },  // Overall average rating
    ratingsCount: { type: Number, default: 0 }  // Number of ratings
});

const ServicesModel = mongoose.model('Services', ServicesSchema);
module.exports = ServicesModel;
