const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 1. MONGODB CONNECTION
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forgefolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ ForgeFolio Backend: Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ Connection error:', err));

// 2. SCHEMA
const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: String,
  title: String,
  bio: String,
  skills: [String],
  projects: [{ 
    title: String, 
    description: String, 
    link: String, 
    image: String, 
    tags: String 
  }],
  template: { type: String, default: 'minimal' },
  lastUpdated: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// 3. API ROUTES
app.post('/api/portfolio', async (req, res) => {
  const { userId, portfolioData } = req.body;
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { userId: userId },
      { ...portfolioData, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/portfolio/:userId', async (req, res) => {
  try {
    const data = await Portfolio.findOne({ userId: req.params.userId });
    if (!data) return res.status(200).json({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 ForgeFolio Backend live on port ${PORT}`));