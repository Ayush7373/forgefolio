const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Portfolio = require('../models/Portfolio');

// 1. Sync Portfolio (Save/Update)
router.post('/sync', auth, async (req, res) => {
  try {
    const portfolioData = req.body;
    let portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user.id },
      { ...portfolioData, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 2. Get Logged-in User's Portfolio
router.get('/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 3. Generate Shareable Slug
router.post('/share', auth, async (req, res) => {
  try {
    const { slug } = req.body; // e.g., "ayush-dev"
    const existing = await Portfolio.findOne({ slug });
    if (existing) return res.status(400).json({ msg: 'Slug already taken' });

    const portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user.id },
      { slug },
      { new: true }
    );
    res.json({ msg: 'Slug generated', slug: portfolio.slug });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;