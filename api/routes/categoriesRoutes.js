const express = require('express');
const router = express.Router(); // Define 'router' correctly
const CategoryModel = require('../models/Category');
const ServicesModel = require('../models/Services'); 

// GET: Fetch all categories
router.get('/all', async (req, res) => { 
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// NEW: GET services by category ID
router.get('/:categoryId/services', async (req, res) => { // Use 'router' here
  try {
    const { categoryId } = req.params;
    const category = await CategoryModel.findById(categoryId).populate('services'); 

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ category, services: category.services }); 
  } catch (error) {
    console.error('Error fetching services by category ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;