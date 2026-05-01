const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Get Public Portfolio by Slug
router.get('/portfolio/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug }).populate('user', 'name');
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;