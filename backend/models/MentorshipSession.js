const mongoose = require('mongoose');

const mentorshipSessionSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  programType: {
    type: String,
    enum: ['1-on-1', 'Intensive', 'Complete'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  sessions: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  startDate: Date,
  endDate: Date,
  scheduledSessions: [{
    date: Date,
    time: String,
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MentorshipSession', mentorshipSessionSchema); 