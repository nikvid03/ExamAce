const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  },
  topic: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Video', 'PDF', 'Notes', 'Practice'],
    required: true
  },
  content: String,
  videoUrl: String,
  pdfUrl: String,
  duration: Number, // for videos
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema); 