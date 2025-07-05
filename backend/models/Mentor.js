const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  subjects: [{
    type: String,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  }],
  exams: [{
    type: String,
    enum: ['JEE', 'NEET']
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  students: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 0
  },
  specialization: String,
  achievements: [String],
  hourlyRate: {
    type: Number,
    required: true
  },
  languages: [String],
  availability: String,
  bio: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Mentor', mentorSchema); 