// routes/serviceProviderRoutes.js
const express = require('express');
const ServiceProviderModel = require('../models/ServiceProvider');
const ServicesModel = require('../models/Services');

const router = express.Router();

// POST: Register a new service provider
router.post('/register', async (req, res) => {
  const { name, description, services, location } = req.body;
  if (!name || !services || !services.length || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const serviceIds = services.map(service => service.serviceId);
    const validServices = await ServicesModel.find({ '_id': { $in: serviceIds } });

    if (validServices.length !== serviceIds.length) {
      return res.status(404).json({ error: 'One or more services not found' });
    }

    for (let service of services) {
      if (!service.servicePrice) {
        return res.status(400).json({ error: 'Each service must have a price' });
      }
    }

    const newServiceProvider = new ServiceProviderModel({ name, description, services, location });
    await newServiceProvider.save();
    res.status(201).json(newServiceProvider);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Fetch all service providers or by serviceId
router.get('/all', async (req, res) => {
  const { serviceId } = req.query;
  let query = serviceId ? { 'services.serviceId': serviceId } : {};

  try {
    let providers = await ServiceProviderModel.find(query);

    // If serviceId is provided, filter the services within each provider
    if (serviceId) {
      providers = providers.map(provider => {
        // Filter only the services that match the given serviceId
        provider.services = provider.services.filter(service => service.serviceId.toString() === serviceId);
        return provider;
      }).filter(provider => provider.services.length > 0); // Ensure provider has the serviceId
    }

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
