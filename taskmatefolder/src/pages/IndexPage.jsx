import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);  // Added loading states
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorServices, setErrorServices] = useState(null);  // Added error states
  const [errorCategories, setErrorCategories] = useState(null);

  // Fetch services
  useEffect(() => {
    axios.get('/api/services')
      .then(response => {
        setServices(response.data);
        setLoadingServices(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setErrorServices('Error fetching services');
        setLoadingServices(false);
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setErrorCategories('Error fetching categories');
        setLoadingCategories(false);
      });
  }, []);

  return (
    <div className="mt-8">
      {/* Display Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : errorCategories ? (
          <p className="text-red-500">{errorCategories}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.length > 0 ? (
              categories.map(category => (
                <div key={category._id} className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
                  <p className="font-semibold">{category.name}</p>
                </div>
              ))
            ) : (
              <p>No categories available at the moment.</p>
            )}
          </div>
        )}
      </div>

      {/* Display Services */}
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {loadingServices ? (
          <p>Loading services...</p>
        ) : errorServices ? (
          <p className="text-red-500">{errorServices}</p>
        ) : (
          services.length > 0 ? (
            services.map(service => (
              <Link to={'/service/' + service._id} key={service._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {service.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square" src={service.photos?.[0]} alt=""/>
                  )}
                </div>
                <h2 className="font-bold">{service.title}</h2>
                <h3 className="text-sm text-gray-500">{service.description}</h3>
                <div className="mt-1">
                  <span className="font-bold">${service.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>No services available at the moment.</p>
          )
        )}
      </div>
    </div>
  );
}
