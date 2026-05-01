const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  // Link to the User model
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  // Unique URL identifier (e.g., "ayush-portfolio")
  slug: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  fullName: String,
  title: String,
  bio: String,
  skills: [String],
  // The new theme engine settings
  theme: {
    font: { type: String, default: 'Poppins' },
    color: { type: String, default: '#2563eb' },
    layout: { type: String, default: 'comfortable' }
  },
  projects: [{
    title: String,
    description: String,
    link: String,
    image: String,
    tags: String
  }],
  template: { 
    type: String, 
    default: 'minimal' 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);