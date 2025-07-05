const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update User Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update through this route
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...updates, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get Dashboard Stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get recent test results
    const TestResult = require('../models/TestResult');
    const recentResults = await TestResult.find({ userId: req.user._id })
      .populate('testId', 'title subject')
      .sort({ completedAt: -1 })
      .limit(5);

    const stats = {
      user: {
        studyStreak: user.studyStreak,
        totalStudyHours: user.totalStudyHours,
        testsCompleted: user.testsCompleted,
        averageScore: user.averageScore
      },
      recentResults,
      upcomingTests: [], // You can add logic for upcoming tests
      recommendedTopics: [] // You can add logic for recommendations
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router; 