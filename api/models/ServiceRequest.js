const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceRequestSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Services' }, // Optional
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Optional
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  neededBy: { type: Date },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Completed', 'Rejected'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now },
  notes: { type: String }
});

const ServiceRequest = mongoose.model('ServiceRequest', ServiceRequestSchema);
module.exports = ServiceRequest;
