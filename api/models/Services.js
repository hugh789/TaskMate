const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true } // Reference to Category
  //  price: { type: Number, required: true },
   // location: { type: String, required: true },
   // createdAt: { type: Date, default: Date.now },
   // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
   // rating: { type: Number, default: 0 },  // Overall average rating
   // ratingsCount: { type: Number, default: 0 }  // Number of ratings
});

const ServicesModel = mongoose.model('Services', ServicesSchema);
module.exports = ServicesModel;
