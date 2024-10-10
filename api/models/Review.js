const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true }, // Updated to match Services model name
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;