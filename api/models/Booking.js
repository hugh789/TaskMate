const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const BookingSchema = new Schema({
  _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceProviderId: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;
