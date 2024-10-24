const express = require('express');
const ServiceProviderModel = require('../models/ServiceProvider');
const ServicesModel = require('../models/Services');
const router = express.Router();
const axios = require('axios');

// GET: Fetch all service providers or by serviceId
router.get('/all', async (req, res) => {
  const { serviceId, keyword, latitude, longitude } = req.query;  
  const radius = 5000;  // Search within a 5 km radius

  // Validate that either serviceId or keyword is provided
  if (!serviceId && !keyword) {
    return res.status(400).json({ error: 'Either serviceId or keyword must be provided' });
  }

  let query = serviceId ? { 'services.serviceId': serviceId } : {};

  try {
        // Prepare final response array
        const finalResponse = [];
    if(serviceId) {}
    // Fetch service providers based on the query
    let providers = await ServiceProviderModel.find(query);



    // Process each provider
    for (const provider of providers) {
      const localProvider = {
        _id: provider._id,
        name: provider.name,
        description: provider.description,
        services: provider.services.filter(service => service.serviceId.toString() === serviceId), // Filter services by serviceId
        location: provider.location,
        place_id: provider.place_id,
        reviews: provider.reviews,
        createdAt: provider.createdAt,
      };

      // Initialize the google response as null
      let googleProvider = null;

      // Check if place_id exists
      if (provider.place_id) {
        // Call Google Places API to get place details
        const googleDetailsApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${provider.place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
        
        try {
          const googleResponse = await axios.get(googleDetailsApiUrl);
          const placeDetails = googleResponse.data.result;

          // Populate googleProvider with the place details
          googleProvider = {
            place_id: placeDetails.place_id,
            name: placeDetails.name,
            address: placeDetails.formatted_address,
            rating: placeDetails.rating,
            user_ratings_total: placeDetails.user_ratings_total,
            business_status: placeDetails.business_status,
            reviews: placeDetails.reviews ? placeDetails.reviews.slice(0, 2) : [],
            location: {
              lat: placeDetails.geometry.location.lat, // Add latitude
              lng: placeDetails.geometry.location.lng  // Add longitude
            }
          };
        } catch (error) {
          console.error('Error fetching place details from Google Places API:', error);
          googleProvider = null; // If the API call fails, set googleProvider to null
        }
      }

      // Add the local and google data to the final response
      finalResponse.push({
        local: localProvider.services.length > 0 ? localProvider : null, // Only include local data if services exist
        google: googleProvider,
      });
    }

    // After processing providers, if serviceId is provided, fetch the corresponding service title
    if (serviceId) {
      const service = await ServicesModel.findById(serviceId);

      if (service) {
        const keyword = service.title; // Use the service title as the keyword for nearby search
        await fetchNearbyPlaces(keyword, latitude, longitude, finalResponse);
      }
    } else if (keyword) {
      // If only keyword is provided, directly call the Google Places Nearby Search API
      await fetchNearbyPlaces(keyword, latitude, longitude, finalResponse);
    }

    // Send the final response
    res.status(200).json(finalResponse);
  } catch (error) {
    console.error('Error fetching service providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to fetch nearby places based on a keyword
async function fetchNearbyPlaces(keyword, latitude, longitude, finalResponse) {
  const radius = 5000; // Search within a 5 km radius
  const googleNearbyApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    // Fetch data from Google Places Nearby Search API
    const nearbyResponse = await axios.get(googleNearbyApiUrl);
    const nearbyPlaces = nearbyResponse.data.results;

    // Process nearby places and avoid duplicates based on place_id
    for (const place of nearbyPlaces) {
      // Check if this place_id already exists in the final response
      const alreadyExists = finalResponse.some(item => item.google && item.google.place_id === place.place_id);

      if (!alreadyExists) {
        // Initialize google details
        let nearbyPlaceDetails = {
          place_id: place.place_id,
          name: place.name,
          address: place.vicinity,  // Using vicinity instead of formatted_address for nearby search
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          business_status: place.business_status,
          location: {
            lat: place.geometry.location.lat, // Add latitude
            lng: place.geometry.location.lng  // Add longitude
          }
        };

        // Push the nearby place to the final response
        finalResponse.push({
          local: null, // Set local to null since we're fetching nearby places
          google: nearbyPlaceDetails // Populate with Google Places data
        });
      }
    }
  } catch (error) {
    console.error('Error fetching nearby places from Google Places API:', error);
  }
}

module.exports = router;
