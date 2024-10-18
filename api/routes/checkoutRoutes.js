const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your secret key

// POST: Create a Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { serviceId, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: `Service: ${serviceId}`,
            },
            unit_amount: price * 100,  // price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',  // URL after successful payment
      cancel_url: 'http://localhost:5173/cancel',    // URL after canceled payment
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with creating the session.' });
  }
});

module.exports = router;
