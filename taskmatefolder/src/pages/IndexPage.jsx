// src/pages/IndexPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorServices, setErrorServices] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/service/all');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrorServices('Error fetching services');
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorCategories('Error fetching categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Tagline */}
      <div className="text-center py-10">
        <h2 className="text-[#414141] text-6xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">Love where you live</h2>
        <p className="text-[#6b6b6b] text-xl md:text-2xl mt-4">Certified experts for home repairs & maintenance</p>
      </div>

      {/* Categories Section */}
      <div className="mb-8 w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 py-2 text-left">Categories</h2>
        {loadingCategories ? (
          <p className="text-center">Loading categories...</p>
        ) : errorCategories ? (
          <p className="text-red-500 text-center">{errorCategories}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category._id} 
                to={`/categories/${category._id}/services`}  // Link to the category services page
                className="relative group cursor-pointer overflow-hidden bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl text-center"
              >
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center mb-4">
                  {/* Add your category icon logic here */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <div className="text-gray-900 font-semibold">{category.name}</div>
                <p className="text-gray-600 text-sm">Perfect for discovering {category.name}.</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Services Section */}
      <div className="mb-8 w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 py-2 text-left">Featured Services</h2>
        {loadingServices ? (
          <p className="text-center">Loading services...</p>
        ) : errorServices ? (
          <p className="text-red-500 text-center">{errorServices}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link 
                key={service._id} 
                to={`/service/${service._id}`}  // Link to service details page
                className="relative group cursor-pointer overflow-hidden bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl text-center"
              >
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center mb-4">
                  {/* Add your service icon logic here */}
                  <img src={service.imageUrl} alt={service.title} className="w-10 h-10" />
                </div>
                <div className="text-gray-900 font-semibold">{service.title}</div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
