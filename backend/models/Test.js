const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Full Syllabus']
  },
  type: {
    type: String,
    enum: ['Mock', 'Chapter', 'Practice', 'Assessment'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  instructions: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  attempts: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema); 