const express = require('express');
const router = express.Router();
const BookingModel = require('../models/Booking');
const ServiceProviderModel = require('../models/ServiceProvider');
const UserModel = require('../models/User');
const ReviewModel = require('../models/Review');

// POST: Book a service with a service provider
router.post('/submit', async (req, res) => {
  const { userId, serviceProviderId, serviceId, servicePrice, bookingDate } = req.body;

  if (!userId || !serviceProviderId || !serviceId || !servicePrice) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the service provider and service exist
    const serviceProvider = await ServiceProviderModel.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found' });
    }

    // Find if the service provider offers the requested service
    const serviceExists = serviceProvider.services.some(service => service.serviceId.toString() === serviceId);
    if (!serviceExists) {
      return res.status(404).json({ error: 'Service not offered by this provider' });
    }

    // Create a new booking
    const newBooking = new BookingModel({
      userId,
      serviceProviderId,
      serviceId,
      servicePrice,
      bookingDate: bookingDate || Date.now()  // If no bookingDate is provided, use current date
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET: Fetch bookings based on userId and/or serviceProviderId
router.get('/all', async (req, res) => {
  const { userId, serviceProviderId } = req.query;

  // Construct the query object based on the provided query parameters
  let query = {};
  if (userId) {
    query.userId = userId;
  }
  if (serviceProviderId) {
    query.serviceProviderId = serviceProviderId;
  }

  try {
    const bookings = await BookingModel.find(query);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update booking status (accept, complete, cancel)
router.put('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  const { status, id } = req.body; // Expecting 'id' in the body

  // Check if the status is valid
  const validStatuses = ['in-progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    // Fetch the booking to check its current status
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking is already completed or cancelled
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking cannot be updated once it is completed or cancelled' });
    }

    // Check if the id belongs to a valid service provider
    const serviceProvider = await ServiceProviderModel.findById(id);
    if (serviceProvider) {
      // If id is a service provider, allow all statuses
      const updatedBooking = await BookingModel.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true, runValidators: true }
      );

      return res.status(200).json(updatedBooking);
    }

    // If the id is not a service provider, check if it belongs to a valid user
    const user = await UserModel.findById(id);
    if (user) {
      // If id is a user, only allow cancellation
      if (status !== 'cancelled') {
        return res.status(400).json({ error: 'User can only cancel bookings' });
      }

      const updatedBooking = await BookingModel.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true, runValidators: true }
      );

      return res.status(200).json(updatedBooking);
    }

    // If id does not correspond to either a service provider or user
    return res.status(404).json({ error: 'Invalid user or service provider ID' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST: Create a new review for a service provider based on the booking ID
router.post('/:bookingId/review', async (req, res) => {
  const { userId, rating, comment } = req.body; // Accept userId in the request body
  const { bookingId } = req.params; // Get bookingId from the URL parameters

  // Validate input
  if (!userId || !rating || !bookingId) {
      return res.status(400).json({ error: 'User ID, rating, and booking ID are required' });
  }

  if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
      // Check if the booking exists and is completed
      const booking = await BookingModel.findById(bookingId).populate('serviceProviderId');
      if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
      }

      if (booking.status !== 'completed') {
          return res.status(400).json({ error: 'Review can only be posted for completed bookings' });
      }

      // Create a new review, linking to the booking and user
      const review = new ReviewModel({
          userId: userId,
          bookingId: bookingId,
          rating,
          comment
      });

      // Save the review to the database
      await review.save();

      // Optionally, push the review into the service provider's reviews array
      await ServiceProviderModel.findByIdAndUpdate(
          booking.serviceProviderId,
          { $push: { reviews: review._id } }, // Add the review ID to the service provider's reviews array
          { new: true }
      );

      res.status(201).json(review);
  } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
