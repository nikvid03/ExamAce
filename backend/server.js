const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Import models
const Question = require('./models/Question');
const Test = require('./models/Test');
const TestResult = require('./models/TestResult');
const Mentor = require('./models/Mentor');
const MentorshipSession = require('./models/MentorshipSession');
const Discussion = require('./models/Discussion');
const StudyMaterial = require('./models/StudyMaterial');

// Import middleware
const { authenticateToken } = require('./middleware/auth');

// Import utilities
const { generatePassword, sendWelcomeEmail } = require('./utils/email');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ==================== API ENDPOINTS ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ExamAce Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Get Questions by Subject
app.get('/api/questions/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const { difficulty, topic, limit = 10 } = req.query;

    let query = { subject };
    if (difficulty) query.difficulty = difficulty;
    if (topic) query.topic = topic;

    const questions = await Question.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get All Tests
app.get('/api/tests', async (req, res) => {
  try {
    const { subject, type, difficulty } = req.query;

    let query = { isActive: true };
    if (subject) query.subject = subject;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;

    const tests = await Test.find(query)
      .populate('questions', 'question options correctAnswer marks')
      .sort({ createdAt: -1 });

    res.json(tests);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// Get Test by ID
app.get('/api/tests/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('questions', 'question options marks');

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    res.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
});

// Submit Test Result
app.post('/api/test-results', authenticateToken, async (req, res) => {
  try {
    const { testId, score, totalMarks, timeTaken, answers } = req.body;

    const percentage = (score / totalMarks) * 100;

    const testResult = new TestResult({
      userId: req.user._id,
      testId,
      score,
      totalMarks,
      percentage,
      timeTaken,
      answers
    });

    await testResult.save();

    // Update user stats
    const User = require('./models/User');
    const user = await User.findById(req.user._id);
    user.testsCompleted += 1;
    user.averageScore = ((user.averageScore * (user.testsCompleted - 1)) + percentage) / user.testsCompleted;
    await user.save();

    res.status(201).json(testResult);
  } catch (error) {
    console.error('Error submitting test result:', error);
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

// Get User's Test Results
app.get('/api/test-results', authenticateToken, async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.user._id })
      .populate('testId', 'title subject type')
      .sort({ completedAt: -1 });

    res.json(results);
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ error: 'Failed to fetch test results' });
  }
});

// Get All Mentors
app.get('/api/mentors', async (req, res) => {
  try {
    const { exam, subject, search } = req.query;

    let query = { isActive: true };
    if (exam) query.exams = exam;
    if (subject) query.subjects = subject;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const mentors = await Mentor.find(query).sort({ rating: -1 });
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

// Get Mentor by ID
app.get('/api/mentors/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ error: 'Failed to fetch mentor' });
  }
});

// Book Mentorship Session
app.post('/api/mentorship-sessions', authenticateToken, async (req, res) => {
  try {
    const { mentorId, programType, duration, sessions, price } = req.body;

    const mentorshipSession = new MentorshipSession({
      mentorId,
      studentId: req.user._id,
      programType,
      duration,
      sessions,
      price
    });

    await mentorshipSession.save();

    res.status(201).json(mentorshipSession);
  } catch (error) {
    console.error('Error booking mentorship session:', error);
    res.status(500).json({ error: 'Failed to book mentorship session' });
  }
});

// Get User's Mentorship Sessions
app.get('/api/mentorship-sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await MentorshipSession.find({ studentId: req.user._id })
      .populate('mentorId', 'name qualification specialization')
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentorship sessions:', error);
    res.status(500).json({ error: 'Failed to fetch mentorship sessions' });
  }
});

// Create Discussion
app.post('/api/discussions', authenticateToken, async (req, res) => {
  try {
    const { title, content, subject, tags } = req.body;

    const discussion = new Discussion({
      title,
      content,
      author: req.user._id,
      subject,
      tags
    });

    await discussion.save();

    const populatedDiscussion = await Discussion.findById(discussion._id)
      .populate('author', 'firstName lastName');

    res.status(201).json(populatedDiscussion);
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ error: 'Failed to create discussion' });
  }
});

// Get All Discussions
app.get('/api/discussions', async (req, res) => {
  try {
    const { subject, search, sort = 'latest' } = req.query;

    let query = {};
    if (subject) query.subject = subject;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'popular') sortOption = { 'replies.length': -1 };

    const discussions = await Discussion.find(query)
      .populate('author', 'firstName lastName')
      .sort(sortOption);

    res.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Failed to fetch discussions' });
  }
});

// Get Discussion by ID
app.get('/api/discussions/:id', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'firstName lastName')
      .populate('replies.author', 'firstName lastName');

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    res.json(discussion);
  } catch (error) {
    console.error('Error fetching discussion:', error);
    res.status(500).json({ error: 'Failed to fetch discussion' });
  }
});

// Add Reply to Discussion
app.post('/api/discussions/:id/replies', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.replies.push({
      author: req.user._id,
      content
    });

    await discussion.save();

    const updatedDiscussion = await Discussion.findById(req.params.id)
      .populate('author', 'firstName lastName')
      .populate('replies.author', 'firstName lastName');

    res.json(updatedDiscussion);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Failed to add reply' });
  }
});

// Get Study Materials
app.get('/api/study-materials', async (req, res) => {
  try {
    const { subject, topic, type, difficulty } = req.query;

    let query = {};
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;

    const materials = await StudyMaterial.find(query)
      .sort({ createdAt: -1 });

    res.json(materials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ error: 'Failed to fetch study materials' });
  }
});

// ==================== SEED DATA ENDPOINTS ====================

// Add sample questions
app.post('/api/seed/questions', async (req, res) => {
  try {
    const sampleQuestions = [
      {
        question: "A particle moves in a straight line with constant acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?",
        options: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"],
        correctAnswer: 0,
        explanation: "Using the equation s = ut + ½at², we can solve for acceleration.",
        subject: "Physics",
        topic: "Kinematics",
        difficulty: "Medium",
        marks: 4
      },
      {
        question: "Which of the following compounds will undergo nucleophilic substitution reaction most readily?",
        options: ["CH₃CH₂Cl", "CH₃CH₂Br", "CH₃CH₂I", "CH₃CH₂F"],
        correctAnswer: 2,
        explanation: "Iodide ion is the best leaving group among halides.",
        subject: "Chemistry",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        marks: 4
      },
      {
        question: "The derivative of ln(sin x) with respect to x is:",
        options: ["cos x", "cot x", "tan x", "sec x"],
        correctAnswer: 1,
        explanation: "Using chain rule: d/dx[ln(sin x)] = (1/sin x) × cos x = cot x",
        subject: "Mathematics",
        topic: "Calculus",
        difficulty: "Medium",
        marks: 4
      },
      {
        question: "The powerhouse of the cell is:",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
        correctAnswer: 1,
        explanation: "Mitochondria produce ATP through cellular respiration, providing energy for cellular processes",
        subject: "Biology",
        topic: "Cell Biology",
        difficulty: "Easy",
        marks: 4
      }
    ];

    await Question.insertMany(sampleQuestions);
    res.json({ message: 'Sample questions added successfully' });
  } catch (error) {
    console.error('Error seeding questions:', error);
    res.status(500).json({ error: 'Failed to add sample questions' });
  }
});

// Add sample mentors
app.post('/api/seed/mentors', async (req, res) => {
  try {
    const sampleMentors = [
      {
        name: "Dr. Rajesh Kumar",
        qualification: "IIT Delhi, Ph.D. Physics",
        experience: "12 years",
        subjects: ["Physics", "Mathematics"],
        exams: ["JEE"],
        rating: 4.9,
        reviews: 847,
        students: 2500,
        successRate: 94,
        specialization: "Mechanics & Thermodynamics",
        achievements: ["AIR 12 JEE Advanced", "Published Researcher", "IIT Faculty"],
        hourlyRate: 2000,
        languages: ["Hindi", "English"],
        availability: "Mon-Fri 6-10 PM",
        bio: "Experienced IIT faculty with expertise in advanced physics concepts."
      },
      {
        name: "Dr. Priya Sharma",
        qualification: "AIIMS Delhi, MBBS, MD",
        experience: "8 years",
        subjects: ["Biology", "Chemistry"],
        exams: ["NEET"],
        rating: 4.8,
        reviews: 623,
        students: 1800,
        successRate: 96,
        specialization: "Human Physiology & Organic Chemistry",
        achievements: ["AIIMS Topper", "Medical Researcher", "NEET Expert"],
        hourlyRate: 1800,
        languages: ["Hindi", "English", "Tamil"],
        availability: "Tue-Sat 5-9 PM",
        bio: "AIIMS graduate with deep understanding of medical entrance patterns."
      }
    ];

    await Mentor.insertMany(sampleMentors);
    res.json({ message: 'Sample mentors added successfully' });
  } catch (error) {
    console.error('Error seeding mentors:', error);
    res.status(500).json({ error: 'Failed to add sample mentors' });
  }
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 ExamAce Backend API is ready!`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` API Documentation: http://localhost:${PORT}/api`);
});