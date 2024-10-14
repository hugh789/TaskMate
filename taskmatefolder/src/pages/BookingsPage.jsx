import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {
  const [userId, setUserId] = useState('');
  const [serviceProviderId, setServiceProviderId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/api/bookings/submit', {
        userId,
        serviceProviderId,
        serviceId,
        servicePrice,
        bookingDate,
      });
      console.log('Booking successful:', data);
      navigate('/bookings'); // Redirect to a bookings list page or confirmation page
    } catch (error) {
      console.error('Error creating booking:', error.response ? error.response.data : error.message);
      setError('Error creating booking. Please try again.');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Service</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your User ID"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Service Provider ID</label>
          <input
            type="text"
            value={serviceProviderId}
            onChange={(e) => setServiceProviderId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Provider ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Service ID</label>
          <input
            type="text"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Service Price</label>
          <input
            type="number"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Service
        </button>
      </form>
    </div>
  );
}
