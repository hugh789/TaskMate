import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import GoogleMapReact from 'google-map-react';
import './ServiceProviders.css';

const ServiceProvidersPage = () => {
  const { serviceId } = useParams();
  const location = useLocation(); // Use useLocation to get the state
  const serviceTitle = location.state?.title; // Get the service title from the state
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  // Replace with actual user location
  const userLocation = { latitude: -37.776388, longitude: 144.8841253 };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`/api/service-provider/all`, {
          params: {
            serviceId: serviceId,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }
        });
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Error fetching providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceId]);

  const Marker = ({ text, onClick, isSelected }) => (
    <div className={`marker ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div className="marker-icon">📍</div>
      <div className="marker-text">{text}</div>
    </div>
  );

  const handleMarkerClick = (provider) => {
    setSelectedProviderId(provider.local ? provider.local._id : provider.google.place_id);
  };

  // Separate local and Google providers
  const localProviders = providers.filter(provider => provider.local);
  const googleProviders = providers.filter(provider => provider.google && !provider.local); // Exclude local providers

  return (
  <div className="container">
    <div className="provider-list">
      <h2 className="text-2xl font-bold mb-4">Service Providers</h2>
      {serviceTitle && <h3 className="text-xl mb-4 text-gray-700">{serviceTitle}</h3>} {/* Subheading for service title */}

      {loading ? (
        <p>Loading providers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Display Local Providers with Google data */}
          {localProviders.map((provider) => (
            <div 
              key={provider.local._id} 
              className={`provider-card border p-4 rounded-lg mb-4 relative ${selectedProviderId === provider.local._id ? 'highlight' : ''}`}
              onClick={() => handleMarkerClick(provider)}
            >
              <h3 className="font-semibold">{provider.local.name}</h3>
              <div className="tag-wrapper">
                <span className="bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1 mr-2">Verified</span>
                {provider.google === null && <span className="bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">Freelancer</span>}
              </div>
              {provider.google ? (
                <p>{provider.google.address}</p> // Use Google address if available
              ) : (
                <p>No specific address available</p>
              )}
              <p>Rating: {provider.google ? provider.google.rating : 'N/A'}</p>

              <div className="price-book-container">
                {/* Show Price for Verified Providers */}
                {provider.local && (
                  <p className="text-gray-800 font-medium price">Price: ${provider.local.services[0].servicePrice}</p>
                )}
                {/* Placeholder Book Button */}
                <button className="book-button">Book</button>
              </div>
            </div>
          ))}

          {/* Divider if Google providers exist */}
          {googleProviders.length > 0 && <hr className="my-4 border-gray-300" />}

          {/* Display Google Providers */}
          {googleProviders.map((provider) => (
            <div 
              key={provider.google.place_id} 
              className={`provider-card border p-4 rounded-lg mb-4 relative ${selectedProviderId === provider.google.place_id ? 'highlight' : ''}`}
              onClick={() => handleMarkerClick(provider)}
            >
              <h3 className="font-semibold">{provider.google.name}</h3>
              {provider.local && <span className="bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1 mr-2">Verified</span>}
              <p>{provider.google.address}</p>
              <p>Rating: {provider.google.rating}</p>
            </div>
          ))}
        </>
      )}
    </div>

    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDxa05t1ztp66UcLbPZukTm4J06u6gmqKY' }}
        defaultCenter={{ lat: userLocation.latitude, lng: userLocation.longitude }}
        defaultZoom={12}
      >
        {providers.map((provider) => {
          const isLocalProvider = provider.local;
          const isGoogleProvider = provider.google;

          if (isLocalProvider && isGoogleProvider && provider.google.location) {
            const { lat, lng } = provider.google.location; // Use Google location
            const providerName = provider.local.name;
            const isSelected = selectedProviderId === provider.local._id;

            return (
              <Marker
                key={provider.local._id}
                lat={lat}
                lng={lng}
                text={providerName}
                onClick={() => handleMarkerClick(provider)}
                isSelected={isSelected}
              />
            );
          } else if (isGoogleProvider && provider.google.location) {
            const { lat, lng } = provider.google.location;
            const providerName = provider.google.name;
            const isSelected = selectedProviderId === provider.google.place_id;

            return (
              <Marker
                key={provider.google.place_id}
                lat={lat}
                lng={lng}
                text={providerName}
                onClick={() => handleMarkerClick(provider)}
                isSelected={isSelected}
              />
            );
          }
          return null;
        })}
      </GoogleMapReact>
    </div>
  </div>
);

};

export default ServiceProvidersPage;
