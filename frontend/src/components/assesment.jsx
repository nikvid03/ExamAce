import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, BarChart3, Target, Trophy, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Solutions from './solutions.jsx';

const AssessmentPlatform = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'test', 'results'
  const [currentTest, setCurrentTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const navigate = useNavigate();

  const availableTests = [
    {
      id: 1,
      title: 'JEE Main Mock Test 15',
      subject: 'Full Syllabus',
      duration: 30, // minutes (reduced for 10 questions)
      questions: 10,
      maxMarks: 40,
      difficulty: 'Medium',
      attempts: 1250,
      avgScore: 78,
      type: 'mock'
    },
    {
      id: 2,
      title: 'Physics - Mechanics Chapter Test',
      subject: 'Physics',
      duration: 20,
      questions: 10,
      maxMarks: 40,
      difficulty: 'Easy',
      attempts: 890,
      avgScore: 85,
      type: 'chapter'
    },
    {
      id: 3,
      title: 'Chemistry - Organic Chemistry Test',
      subject: 'Chemistry',
      duration: 25,
      questions: 10,
      maxMarks: 40,
      difficulty: 'Hard',
      attempts: 567,
      avgScore: 65,
      type: 'chapter'
    },
    {
      id: 4,
      title: 'Mathematics - Calculus Practice',
      subject: 'Mathematics',
      duration: 25,
      questions: 10,
      maxMarks: 40,
      difficulty: 'Medium',
      attempts: 723,
      avgScore: 72,
      type: 'practice'
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: "A particle moves in a straight line with constant acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?",
      options: [
        "2.5 m/s²",
        "5 m/s²",
        "7.5 m/s²",
        "10 m/s²"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4
    },
    {
      id: 2,
      question: "Which of the following compounds will undergo nucleophilic substitution reaction most readily?",
      options: [
        "CH₃CH₂Cl",
        "CH₃CH₂Br",
        "CH₃CH₂I",
        "CH₃CH₂F"
      ],
      correctAnswer: 2,
      subject: "Chemistry",
      marks: 4
    },
    {
      id: 3,
      question: "The derivative of ln(sin x) with respect to x is:",
      options: [
        "cos x",
        "cot x",
        "tan x",
        "sec x"
      ],
      correctAnswer: 1,
      subject: "Mathematics",
      marks: 4
    },
    {
      id: 4,
      question: "Two resistors of 4Ω and 6Ω are connected in parallel. What is the equivalent resistance?",
      options: [
        "2.4 Ω",
        "5 Ω",
        "10 Ω",
        "24 Ω"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4
    },
    {
      id: 5,
      question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-COOH is:",
      options: [
        "3-methylbutanoic acid",
        "2-methylbutanoic acid",
        "3-methylpropanoic acid",
        "2-methylpropanoic acid"
      ],
      correctAnswer: 0,
      subject: "Chemistry",
      marks: 4
    },
    {
      id: 6,
      question: "If f(x) = x³ - 6x² + 9x + 1, then f'(x) = 0 at x =",
      options: [
        "x = 1, 3",
        "x = 2, 4",
        "x = 0, 3",
        "x = 1, 2"
      ],
      correctAnswer: 0,
      subject: "Mathematics",
      marks: 4
    },
    {
      id: 7,
      question: "A block of mass 2 kg is placed on a rough inclined plane of angle 30°. If coefficient of friction is 0.5, the acceleration down the plane is: (g = 10 m/s²)",
      options: [
        "0.67 m/s²",
        "1.33 m/s²",
        "2.5 m/s²",
        "5 m/s²"
      ],
      correctAnswer: 1,
      subject: "Physics",
      marks: 4
    },
    {
      id: 8,
      question: "Which of the following has the highest bond dissociation energy?",
      options: [
        "H-H",
        "F-F",
        "Cl-Cl",
        "Br-Br"
      ],
      correctAnswer: 0,
      subject: "Chemistry",
      marks: 4
    },
    {
      id: 9,
      question: "The integral ∫(1/x)dx equals:",
      options: [
        "ln|x| + C",
        "1/x² + C",
        "x²/2 + C",
        "-1/x + C"
      ],
      correctAnswer: 0,
      subject: "Mathematics",
      marks: 4
    },
    {
      id: 10,
      question: "A convex lens of focal length 20 cm forms a real image at a distance of 60 cm from the lens. The object distance is:",
      options: [
        "30 cm",
        "15 cm",
        "12 cm",
        "40 cm"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4
    }
  ];

  const testResults = [
    {
      id: 1,
      testName: 'JEE Main Mock Test 14',
      score: 32,
      maxScore: 40,
      percentage: 80,
      rank: 142,
      totalStudents: 2150,
      date: '2025-06-25',
      timeSpent: '28 min',
      subject: 'Full Syllabus'
    },
    {
      id: 2,
      testName: 'Physics Chapter Test',
      score: 35,
      maxScore: 40,
      percentage: 87.5,
      rank: 23,
      totalStudents: 890,
      date: '2025-06-23',
      timeSpent: '18 min',
      subject: 'Physics'
    }
  ];

  useEffect(() => {
    let timer;
    if (testStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = (test) => {
    setCurrentTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(test.duration * 60);
    setTestStarted(true);
    setCurrentView('test');
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitTest = () => {
    setTestStarted(false);
    setCurrentView('results');
    navigate('/solutions');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mock': return <Target className="w-5 h-5" />;
      case 'chapter': return <CheckCircle className="w-5 h-5" />;
      case 'practice': return <BarChart3 className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (currentView === 'test' && currentTest) {
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Test Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {currentTest.questions}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-orange-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
                </div>
                <button
                  onClick={handleSubmitTest}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {currentQuestion.subject}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{currentQuestion.marks} marks</span>
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={selectedAnswers[currentQuestion.id] === index}
                        onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion.id] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.min(sampleQuestions.length - 1, currentQuestionIndex + 1))}
                    disabled={currentQuestionIndex === sampleQuestions.length - 1}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Question Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {sampleQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 text-sm rounded border ${
                        index === currentQuestionIndex
                          ? 'bg-blue-600 text-white border-blue-600'
                          : selectedAnswers[index + 1]
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span className="text-gray-600">Not Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'results') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Submitted Successfully!</h1>
            <p className="text-gray-600">Your results are being processed and will be available shortly.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Test Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{Object.keys(selectedAnswers).length}</p>
                <p className="text-gray-600">Questions Attempted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{currentTest?.questions - Object.keys(selectedAnswers).length}</p>
                <p className="text-gray-600">Questions Left</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{formatTime((currentTest?.duration * 60) - timeRemaining)}</p>
                <p className="text-gray-600">Time Spent</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              View Solutions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Assessment Platform</h1>
          <p className="text-gray-600 mt-1">Practice tests and mock exams for JEE & NEET preparation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tests Taken</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Best Rank</p>
                <p className="text-2xl font-bold text-gray-900">#12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Tests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(test.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize">{test.type}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2">{test.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{test.subject}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{test.duration} min</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Questions</p>
                      <p className="font-medium">{test.questions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Max Marks</p>
                      <p className="font-medium">{test.maxMarks}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Attempts</p>
                      <p className="font-medium">{test.attempts}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Average Score</span>
                      <span className="font-medium">{test.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${test.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => startTest(test)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Results</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{result.testName}</div>
                          <div className="text-sm text-gray-500">{result.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.score}/{result.maxScore}</div>
                        <div className="text-sm text-gray-500">{result.timeSpent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          result.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{result.rank}</div>
                        <div className="text-sm text-gray-500">of {result.totalStudents}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View Report</button>
                        <button className="text-green-600 hover:text-green-900">Solutions</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Solutions />
    </div>
  );
};

export default AssessmentPlatform;