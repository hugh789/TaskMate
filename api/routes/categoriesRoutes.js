const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/Category');

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

module.exports = router;
