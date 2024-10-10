const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceProviderSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    services: [{
      serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true },  // Reference to Services
      servicePrice: { type: Number, required: true }  // Price for that specific service
    }],
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const ServiceProviderModel = mongoose.model('ServiceProvider', ServiceProviderSchema);
module.exports = ServiceProviderModel;
