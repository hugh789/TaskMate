// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const ReviewSchema = new Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user leaving the review
//     service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // The service being reviewed
//     rating: { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String },
//     createdAt: { type: Date, default: Date.now }
//   });
  
//   const ReviewModel = mongoose.model('Review', ReviewSchema);
//   module.exports = ReviewModel;  