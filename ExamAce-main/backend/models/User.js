const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  
  // Academic Details
  targetExam: {
    type: String,
    required: true,
    enum: ['JEE Main', 'JEE Advanced', 'NEET', 'Both JEE & NEET']
  },
  currentClass: {
    type: String,
    required: true,
    enum: ['Class 10', 'Class 11', 'Class 12', '12th Pass', 'Dropper']
  },
  preferredSubjects: [{
    type: String,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  }],
  previousScore: {
    type: String,
    trim: true
  },
  targetScore: {
    type: String,
    trim: true
  },
  
  // Study Preferences
  studyHours: {
    type: String,
    required: true,
    enum: ['2-4 hours', '4-6 hours', '6-8 hours', '8+ hours']
  },
  
  // Trial Information
  trialStartDate: {
    type: Date,
    default: Date.now
  },
  trialEndDate: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  isTrialActive: {
    type: Boolean,
    default: true
  },
  
  // Preferences
  agreeToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  receiveUpdates: {
    type: Boolean,
    default: false
  },
  
  // Generated credentials
  password: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  
  // Study Progress
  studyStreak: {
    type: Number,
    default: 0
  },
  totalStudyHours: {
    type: Number,
    default: 0
  },
  testsCompleted: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);