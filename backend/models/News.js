const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Markdown format
  date_update: { type: Date, default: Date.now },
  subjects: [String], // e.g., ['history', 'polity']
  author: String,
  summary: String
});

newsSchema.index({ date_update: 1 });
newsSchema.index({ subjects: 1 });

module.exports = mongoose.model('News', newsSchema);
