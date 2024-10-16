const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const ReviewSchema = new Schema({
    _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = ReviewModel;
