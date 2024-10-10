import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
  const [serviceId, setServiceId] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/review', { serviceId, comment, rating });
      navigate('/services'); // Redirect after submission
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit review.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">Service ID</label>
          <input
            type="text"
            id="serviceId"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1 to 5)</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="1"
            max="5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
