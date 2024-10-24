import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa'; // Make sure react-icons is installed

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [price, setPrice] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Function to register user
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      // Prepare the payload
      const servicesPayload = selectedServices.map(service => ({
        serviceId: service._id,
        servicePrice: service.price,
      }));

      await axios.post('/api/user/register', {
        name,
        email,
        password,
        services: servicesPayload.length == 0 ? null : servicesPayload,
        place_id: selectedBusiness ? selectedBusiness.place_id : null, // Send place_id of the selected business
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  // Fetch categories when the component mounts
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/category/all');
        setCategories(response.data);
      } catch (e) {
        console.error('Failed to fetch categories', e);
      }
    }
    fetchCategories();
  }, []);

  // Fetch services based on selected category
  useEffect(() => {
    if (selectedCategory) {
      async function fetchServices() {
        try {
          const response = await axios.get(`/api/service/by-category/${selectedCategory}`);
          setServices(response.data.services);
        } catch (e) {
          console.error('Failed to fetch services', e);
        }
      }
      fetchServices();
    } else {
      setServices([]);
    }
  }, [selectedCategory]);

  // Function to add selected service
  const handleAddService = () => {
    if (selectedService && !selectedServices.some(service => service._id === selectedService)) {
      const serviceToAdd = services.find(service => service._id === selectedService);
      if (serviceToAdd) {
        setSelectedServices(prev => [...prev, { ...serviceToAdd, price }]);
        setSelectedService('');
        setPrice('');
      }
    }
  };

  // Function to remove selected service
  const handleRemoveService = (serviceId) => {
    setSelectedServices(prev => prev.filter(service => service._id !== serviceId));
  };

  const handleSearchBusiness = async () => {
    try {
      const response = await axios.post('/api/user/searchbusiness', {
        businessName,
        location,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      // Handle the error accordingly (e.g., show a message to the user)
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          {/* User Info */}
          <input type="text" placeholder="John Doe" value={name} onChange={ev => setName(ev.target.value)} />
          <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />

          {/* Service Provider Checkbox */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="serviceProviderCheckbox" checked={isServiceProvider} onChange={ev => setIsServiceProvider(ev.target.checked)} />
            <label htmlFor="serviceProviderCheckbox" className="ml-2">Are you a service provider?</label>
          </div>

          {isServiceProvider && (
            <>
              {/* Category Dropdown */}
              <div className="mb-4">
                <select value={selectedCategory} onChange={ev => setSelectedCategory(ev.target.value)} className="w-full border p-2 rounded-md">
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Service Dropdown */}
              <div className="mb-4">
                <select value={selectedService} onChange={ev => setSelectedService(ev.target.value)} disabled={!selectedCategory} className="w-full border p-2 rounded-md">
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service._id} value={service._id}>{service.title}</option>
                  ))}
                </select>
              </div>

              {/* Price Input */}
              <div className="mb-4">
                <input type="number" placeholder="Enter price ($)" value={price} onChange={ev => setPrice(ev.target.value)} disabled={!selectedCategory || !selectedService} className="w-full border p-2 rounded-md" min="0" />
              </div>

              {/* Add Service Button */}
              <div className="text-center mb-4">
                <button type="button" className="px-4 py-2 border rounded-lg bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300" onClick={handleAddService} disabled={!selectedCategory || !selectedService || !price}>
                  Add Service
                </button>
              </div>

              {/* Selected Services List */}
              <div className="mb-4">
                {selectedServices.map(service => (
                  <div key={service._id} className="flex items-center justify-between border-b pb-2 mb-2">
                    <span>{service.title} - ${service.price}</span>
                    <button type="button" onClick={() => handleRemoveService(service._id)}>
                      <FaTimes className="text-red-500 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Business Owner Checkbox */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="businessOwnerCheckbox" checked={isBusinessOwner} onChange={ev => setIsBusinessOwner(ev.target.checked)} />
            <label htmlFor="businessOwnerCheckbox" className="ml-2">Do you own a business?</label>
          </div>

          {/* Business Info (Only if Business Owner) */}
          {isBusinessOwner && (
            <>
              <div className="mb-4">
                <input type="text" placeholder="Business Name" value={businessName} onChange={ev => setBusinessName(ev.target.value)} className="w-full" />
                <input type="text" placeholder="Location" value={location} onChange={ev => setLocation(ev.target.value)} className="w-full" />
              </div>

              {/* Search for Business Button */}
              <div>
                <div className="text-center mb-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-lg bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300"
                    onClick={handleSearchBusiness}
                    disabled={!businessName || !location}
                  >
                    Search for Business
                  </button>
                </div>

                {/* Dropdown for Search Results */}
                {searchResults.length > 0 && (
                  <div className="mb-4">
                    <label htmlFor="businessDropdown" className="block mb-2 font-semibold">
                      Select the business you own:
                    </label>
                    <select
                      id="businessDropdown"
                      className="border rounded-lg p-2 w-full"
                      onChange={(e) => {
                        const selected = searchResults.find(b => b.place_id === e.target.value);
                        setSelectedBusiness(selected);
                      }}
                    >
                      <option value="">-- Select a Business --</option>
                      {searchResults.map((business) => (
                        <option key={business.place_id} value={business.place_id}>
                          {business.formatted_address}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Register Button */}
          <button className="primary" type="submit">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
