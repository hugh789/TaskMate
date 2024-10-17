
// routes/serviceRoutes.js
const express = require('express');
const ServicesModel = require('../models/Services');
const CategoryModel = require('../models/Category');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

// POST: Create a new service
router.post('/register', authenticateUser, async (req, res) => {
  const { title, description, categoryId } = req.body;
  if (!title || !description || !categoryId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const newService = new ServicesModel({ title, description, categoryId });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Fetch all services
router.get('/all', async (req, res) => {
  const { categoryId } = req.query;
  const filter = categoryId ? { 'categoryId': categoryId } : {};

  try {
    const services = await ServicesModel.find(filter);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
