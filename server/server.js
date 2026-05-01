const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Connection Error:', err));

// --- MODELS ---

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  slug: { type: String, unique: true } // For public portfolio URLs
});

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  fullName: String,
  title: String,
  bio: String,
  skills: [String],
  projects: Array,
  template: { type: String, default: 'minimal' }
});

const User = mongoose.model('user', UserSchema);
const Portfolio = mongoose.model('portfolio', PortfolioSchema);

// --- MIDDLEWARE ---

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// --- ROUTES ---

// Auth: Signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const slug = name.toLowerCase().split(' ').join('-') + '-' + Math.floor(Math.random() * 1000);
    user = new User({ name, email, password, slug });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, slug: user.slug } });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, slug: user.slug } });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Portfolio: Sync (Save)
app.post('/api/portfolio/sync', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      );
    } else {
      portfolio = new Portfolio({ ...req.body, user: req.user.id });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Portfolio: Get My Portfolio
app.get('/api/portfolio/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Portfolio: Public View (Get by Slug)
app.get('/api/portfolio/slug/:slug', async (req, res) => {
  try {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) return res.status(404).json({ msg: 'Portfolio not found' });
    const portfolio = await Portfolio.findOne({ user: user.id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));