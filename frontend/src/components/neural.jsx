import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Trophy, Clock, Target, Users, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

const JEENEETEduPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [studyStreak, setStudyStreak] = useState(7);

  // Sample questions for different subjects
  const questions = {
    physics: [
      {
        question: "A body is thrown vertically upward with velocity u. The maximum height reached is:",
        options: ["u²/2g", "u²/g", "2u²/g", "u/2g"],
        correct: 0,
        explanation: "At maximum height, final velocity = 0. Using v² = u² - 2gh, we get h = u²/2g"
      },
      {
        question: "The SI unit of electric field intensity is:",
        options: ["N/C", "V/m", "Both A and B", "J/C"],
        correct: 2,
        explanation: "Electric field intensity can be expressed as force per unit charge (N/C) or voltage per unit distance (V/m)"
      }
    ],
    chemistry: [
      {
        question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃ is:",
        options: ["2-methylbutane", "3-methylbutane", "2-methylpropane", "pentane"],
        correct: 0,
        explanation: "The longest chain has 4 carbons (butane) with a methyl group at position 2"
      },
      {
        question: "Which of the following is a Lewis acid?",
        options: ["NH₃", "BF₃", "H₂O", "OH⁻"],
        correct: 1,
        explanation: "BF₃ is electron deficient and can accept electron pairs, making it a Lewis acid"
      }
    ],
    biology: [
      {
        question: "The powerhouse of the cell is:",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
        correct: 1,
        explanation: "Mitochondria produce ATP through cellular respiration, providing energy for cellular processes"
      },
      {
        question: "DNA replication occurs during which phase?",
        options: ["G1 phase", "S phase", "G2 phase", "M phase"],
        correct: 1,
        explanation: "DNA replication occurs during the S (synthesis) phase of interphase"
      }
    ],
    mathematics: [
      {
        question: "The derivative of sin(x) is:",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correct: 0,
        explanation: "The derivative of sin(x) with respect to x is cos(x)"
      },
      {
        question: "If log₂(x) = 3, then x equals:",
        options: ["6", "8", "9", "12"],
        correct: 1,
        explanation: "log₂(x) = 3 means 2³ = x, so x = 8"
      }
    ]
  };

  const studyMaterials = {
    physics: [
      { topic: "Mechanics", chapters: ["Kinematics", "Dynamics", "Work & Energy", "Rotational Motion"] },
      { topic: "Thermodynamics", chapters: ["Heat Transfer", "Laws of Thermodynamics", "Kinetic Theory"] },
      { topic: "Electromagnetism", chapters: ["Electric Field", "Magnetic Field", "Electromagnetic Induction"] }
    ],
    chemistry: [
      { topic: "Organic Chemistry", chapters: ["Hydrocarbons", "Alcohols", "Aldehydes & Ketones", "Carboxylic Acids"] },
      { topic: "Inorganic Chemistry", chapters: ["Periodic Table", "Chemical Bonding", "Coordination Compounds"] },
      { topic: "Physical Chemistry", chapters: ["Atomic Structure", "Chemical Kinetics", "Electrochemistry"] }
    ],
    biology: [
      { topic: "Cell Biology", chapters: ["Cell Structure", "Cell Division", "Biomolecules", "Enzymes"] },
      { topic: "Genetics", chapters: ["Heredity", "DNA Structure", "Protein Synthesis", "Evolution"] },
      { topic: "Human Physiology", chapters: ["Digestive System", "Circulatory System", "Nervous System"] }
    ],
    mathematics: [
      { topic: "Calculus", chapters: ["Limits", "Derivatives", "Integration", "Differential Equations"] },
      { topic: "Algebra", chapters: ["Quadratic Equations", "Sequences & Series", "Permutations & Combinations"] },
      { topic: "Coordinate Geometry", chapters: ["Straight Lines", "Circles", "Parabola", "Ellipse & Hyperbola"] }
    ]
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTestActive(false);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const startTest = () => {
    setIsTestActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(1800);
    setSelectedAnswers({});
  };

  const resetTest = () => {
    setIsTestActive(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(1800);
    setSelectedAnswers({});
  };

  const nextQuestion = () => {
    if (currentQuestion < questions[selectedSubject].length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitTest = () => {
    let correctAnswers = 0;
    questions[selectedSubject].forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsTestActive(false);
    setActiveTab('results');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Aspirant!</h2>
        <p className="opacity-90">Continue your journey to crack IIT JEE & NEET</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Study Streak: {studyStreak} days</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Tests Completed: 15</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(questions).map(subject => (
          <div key={subject} className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold capitalize text-gray-800">{subject}</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {questions[subject].length} practice questions available
            </p>
            <button
              onClick={() => {
                setSelectedSubject(subject);
                setActiveTab('practice');
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Start Practice
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Overall Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">120</div>
            <div className="text-sm text-gray-600">Hours Studied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">450</div>
            <div className="text-sm text-gray-600">Questions Solved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600">Mock Tests</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudyMaterials = () => (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        {Object.keys(studyMaterials).map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedSubject === subject
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {studyMaterials[selectedSubject].map((topic, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">{topic.topic}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topic.chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <span className="text-gray-700">{chapter}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPractice = () => {
    const currentQ = questions[selectedSubject][currentQuestion];
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} Practice
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex space-x-2">
                {!isTestActive ? (
                  <button
                    onClick={startTest}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Test</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTestActive(false)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  onClick={resetTest}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions[selectedSubject].length}
              </span>
              <span className="text-sm text-gray-600">
                Score: {score}/{questions[selectedSubject].length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions[selectedSubject].length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">{currentQ.question}</h3>
            
            <div className="space-y-2">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswers[currentQuestion] !== undefined && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Explanation:</p>
                <p className="text-sm text-blue-700">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestion === questions[selectedSubject].length - 1 ? (
              <button
                onClick={submitTest}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Test Results</h2>
        <div className="text-4xl font-bold text-purple-600 mb-2">
          {score}/{questions[selectedSubject].length}
        </div>
        <p className="text-gray-600 mb-4">
          Accuracy: {((score / questions[selectedSubject].length) * 100).toFixed(1)}%
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('practice')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Practice Again
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            IIT JEE & NEET Preparation Hub
          </h1>
          <p className="text-gray-600">Your comprehensive platform for engineering and medical entrance exam preparation</p>
        </header>

        <nav className="flex justify-center space-x-4 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Target },
            { id: 'study', label: 'Study Materials', icon: BookOpen },
            { id: 'practice', label: 'Practice Tests', icon: Brain },
            { id: 'results', label: 'Results', icon: Trophy }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'study' && renderStudyMaterials()}
          {activeTab === 'practice' && renderPractice()}
          {activeTab === 'results' && renderResults()}
        </main>
      </div>
    </div>
  );
};

export default JEENEETEduPlatform;