import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddServicePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState([{ serviceId: '', servicePrice: '' }]);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add a new service input field
  const addServiceField = () => {
    setServices([...services, { serviceId: '', servicePrice: '' }]);
  };

  // Update service field value
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/api/service-provider/register', {
        name,
        description,
        services,
        location,
      });
      console.log('Service provider added:', data);
      navigate('/services');  // Redirect after successful submission
    } catch (error) {
      console.error('Error adding service provider:', error.response ? error.response.data : error.message);
      setError('Error adding service provider. Please try again.');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Service Provider</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter provider name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter provider description"
          />
        </div>

        {/* Services Section */}
        <div className="mb-4">
          <label className="block text-gray-700">Services</label>
          {services.map((service, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <label className="block text-gray-700 mb-1">Service ID</label>
              <input
                type="text"
                value={service.serviceId}
                onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter service ID"
                required
              />
              <label className="block text-gray-700 mt-2 mb-1">Service Price</label>
              <input
                type="number"
                value={service.servicePrice}
                onChange={(e) => handleServiceChange(index, 'servicePrice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter service price"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addServiceField}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Another Service
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter provider location"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service Provider
        </button>
      </form>
    </div>
  );
}
