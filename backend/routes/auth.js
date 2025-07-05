const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generatePassword, sendWelcomeEmail } = require('../utils/email');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, dateOfBirth, city, state,
      targetExam, currentClass, preferredSubjects, studyHours,
      previousScore, targetScore, agreeToTerms, receiveUpdates
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      city,
      state,
      targetExam,
      currentClass,
      preferredSubjects,
      studyHours,
      previousScore,
      targetScore,
      agreeToTerms,
      receiveUpdates,
      password: hashedPassword
    });

    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user, plainPassword);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        targetExam: user.targetExam,
        isTrialActive: user.isTrialActive,
        trialEndDate: user.trialEndDate
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        targetExam: user.targetExam,
        isTrialActive: user.isTrialActive,
        trialEndDate: user.trialEndDate,
        studyStreak: user.studyStreak,
        totalStudyHours: user.totalStudyHours,
        testsCompleted: user.testsCompleted,
        averageScore: user.averageScore
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router; 