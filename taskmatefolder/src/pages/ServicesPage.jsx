import { Link } from "react-router-dom";
import AccountNav from "./AccountNav.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services')
      .then(({ data }) => {
        console.log('Services fetched:', data);  // Add this line for debugging
        setServices(data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);
  

  return (
    <div className="container mx-auto p-4">
      <AccountNav />
      <div className="flex justify-between items-center mt-6 mb-6">
        <h1 className="text-3xl font-semibold">Available Services</h1>
        <Link
          className="inline-flex gap-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition-colors"
          to={'/services/new'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add New Service
        </Link>
      </div>

      {services.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {services.map(service => (
      <div key={service._id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">{service.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{service.description}</p>
        <p className="mt-1 text-sm text-gray-800 font-medium">{service.price} USD</p>
        <p className="mt-1 text-sm text-gray-600">{service.location}</p>
      </div>
    ))}
  </div>
) : (
  <p>No services available at the moment.</p>
)}
    </div>
  );
}
