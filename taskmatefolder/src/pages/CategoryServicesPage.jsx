// src/pages/CategoryServicesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q9heqP1rqCue6MCxHV86BzJg7dBFEh7j3mgMmsV8cQvkOWKohThJfA0uGEhLWOqdBIH7tDpWJJiCiD6c1hOkL5w00i3Dj4IAp');

export default function CategoryServicesPage() {
  const { categoryId } = useParams();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`/api/service/by-category/${categoryId}`);
        setServices(response.data.services || []);
        setCategory(response.data.category || null);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error fetching services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  const handleCheckout = async (serviceId, price) => {
    try {
      const response = await axios.post('http://localhost:4000/api/checkout/create-checkout-session', {
        serviceId,
        price,  // Ensure this value is provided in cents
      });
      
      const { id } = response.data;
      
      // Use the stripePromise directly
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">{category?.name} Services</h1>
        <div className="flex space-x-4 mb-8 justify-center">
          {category?.description && <p className="text-lg text-gray-600">{category.description}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => (
              <Link 
                key={service._id} 
                to={`/service/${service._id}`}  // Navigate to the service providers page
                state={{ title: service.title }} // Pass the service title
                className="block card shadow-lg bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-4">
                  <h2 className="text-2xl font-semibold">{service.title}</h2>
                  <p className="text-gray-600 my-2">{service.description}</p>
                  <p className="font-bold text-xl">${service.price}</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={(e) => {
                      e.preventDefault();  // Prevent navigation to handle checkout instead
                      handleCheckout(service._id, service.price);
                    }}
                  >
                    Checkout with Stripe
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No services found for this category.</p>
          )}
        </div>
      </div>
    </Elements>
  );
}
