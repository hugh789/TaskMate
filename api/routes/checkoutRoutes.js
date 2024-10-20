// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ServicesModel = require('../models/Services');  // Import your Services model


// POST: Create a Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { serviceId } = req.body;  // Get the serviceId from the request body

  try {
    // Fetch the service from the database by its ID
    const service = await ServicesModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Convert the price to cents (or the smallest unit of your currency)
    const priceInCents = service.price * 100;

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',  // Adjust this based on your requirements
            product_data: {
              name: service.title,  // Use the service title from your MongoDB
            },
            unit_amount: priceInCents,  // Ensure price is in the smallest currency unit (cents for USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,  // Success redirect URL
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,    // Cancel redirect URL
    });

    // Return the session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Something went wrong with creating the session.' });
  }
});

module.exports = router;