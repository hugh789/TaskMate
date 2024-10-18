// src/pages/CategoryServicesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function CategoryServicesPage() {
  const { categoryId } = useParams();  // Get category ID from the route params
  const [services, setServices] = useState([]);  // Initialize as an empty array
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch services under this category
        const response = await axios.get(`http://localhost:4000/api/service/by-category/${categoryId}`);
        
        // Handle the response safely
        if (response.data.services) {
          setServices(response.data.services);
        } else {
          setServices([]);  // Default to empty array if no services
        }
        
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">{category?.name} Services</h1>
      <div className="flex space-x-4 mb-8 justify-center">
        {category?.description && <p className="text-lg text-gray-600">{category.description}</p>}
      </div>

      {/* Check if services is an array before mapping */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">  {/* <-- Corrected className */}
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="card shadow-lg bg-white rounded-lg">
              <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="text-gray-600 my-2">{service.description}</p>
                <p className="font-bold text-xl">${service.price}</p>
                <Link to={`/service/${service._id}`} className="btn btn-primary mt-4">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No services found for this category.</p>
        )}
      </div>
    </div>
  );
}
