const mongoose = require('mongoose');
const Question = require('./models/Question');
const Mentor = require('./models/Mentor');
require('dotenv').config();

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

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/examace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    await Mentor.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('✅ Sample questions added successfully');

    // Insert sample mentors
    await Mentor.insertMany(sampleMentors);
    console.log('✅ Sample mentors added successfully');

    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase(); 