const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  source: { type: String, required: true, enum: ['manual', 'ad', 'referral'], default: 'manual' },
  status: { type: String, required: true, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
