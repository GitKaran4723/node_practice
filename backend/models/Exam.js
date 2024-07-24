const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exam_date: { type: Date, required: true },
  notification_date: { type: Date, required: true },
  application_start_date: { type: Date, required: true },
  application_end_date: { type: Date, required: true },
  notification_link: { type: String, required: true },
  tag: { type: String, required: true }, // e.g., 'defense', 'government', 'private'
  summary: String
});

examSchema.index({ exam_date: 1 });
examSchema.index({ notification_date: 1 });
examSchema.index({ tag: 1 });

module.exports = mongoose.model('Exam', examSchema);
