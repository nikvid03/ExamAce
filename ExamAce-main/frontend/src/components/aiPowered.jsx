import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, BarChart3, FileText, MessageCircle, Send, Play, TrendingUp, Target, Clock, Award } from 'lucide-react';

const AIStudyHub = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your AI study companion. I can help you with Physics, Chemistry, Mathematics, and Biology concepts for IIT JEE and NEET. What would you like to learn today?", sender: 'ai' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
      options: ["10 m", "15 m", "20 m", "25 m"],
      correct: 2,
      explanation: "Using v² = u² + 2as, at maximum height v = 0, u = 20 m/s, a = -g = -10 m/s². So 0 = (20)² + 2(-10)s → s = 400/20 = 20 m"
    },
    {
      question: "Which of the following is an example of nucleophilic substitution reaction?",
      options: ["CH₃Cl + OH⁻ → CH₃OH + Cl⁻", "C₂H₄ + Br₂ → C₂H₄Br₂", "CH₄ + Cl₂ → CH₃Cl + HCl", "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O"],
      correct: 0,
      explanation: "This shows a nucleophile (OH⁻) attacking the carbon and replacing the leaving group (Cl⁻), which is characteristic of nucleophilic substitution."
    },
    {
      question: "What is the derivative of sin(x²)?",
      options: ["cos(x²)", "2x cos(x²)", "2x sin(x²)", "x cos(x²)"],
      correct: 1,
      explanation: "Using chain rule: d/dx[sin(x²)] = cos(x²) × d/dx(x²) = cos(x²) × 2x = 2x cos(x²)"
    },
    {
      question: "Which organelle is known as the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      correct: 1,
      explanation: "Mitochondria are called the powerhouse of the cell because they generate ATP (energy) through cellular respiration."
    },
    {
      question: "What is the pH of a 0.01 M HCl solution?",
      options: ["1", "2", "12", "14"],
      correct: 1,
      explanation: "For HCl (strong acid), [H⁺] = 0.01 M = 10⁻² M. pH = -log[H⁺] = -log(10⁻²) = 2"
    }
  ];

  useEffect(() => {
    if (activeTab === 'ai-tutor') {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now(),
          text: "Welcome to your personalized AI learning experience! I've analyzed your previous performance and I'm ready to help you excel in JEE/NEET preparation. How can I assist you today?",
          sender: 'ai'
        }]);
      }, 1000);
    }
  }, [activeTab]);

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
      'physics': 'I can help you with Physics concepts! Physics for JEE/NEET covers Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics. What specific topic would you like to explore?',
      'chemistry': 'Chemistry is divided into Physical, Organic, and Inorganic Chemistry. Each has unique problem-solving approaches. Which area interests you most?',
      'mathematics': 'Mathematics for JEE includes Algebra, Trigonometry, Calculus, Coordinate Geometry, and Vectors. These topics build upon each other. What would you like to practice?',
      'biology': 'Biology for NEET covers Botany and Zoology with emphasis on human physiology, genetics, and ecology. Which biological system would you like to understand better?',
      'formula': 'Here are some key formulas: For motion - v = u + at, s = ut + ½at². For energy - KE = ½mv², PE = mgh. Need specific formulas for any topic?',
      'doubt': 'I\'m here to clear your doubts! Please share your specific question, and I\'ll provide a detailed explanation with step-by-step solutions.'
    };
    
    for (let key in responses) {
      if (lowerMessage.includes(key)) {
        return responses[key];
      }
    }
    
    return `Great question! Let me help you understand this concept better. For detailed explanations, please be more specific about the topic or problem you're working on. I can provide step-by-step solutions, concept explanations, and practice problems.`;
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { id: Date.now(), text: chatInput, sender: 'user' };
      setChatMessages(prev => [...prev, userMessage]);
      setChatInput('');
      
      setTimeout(() => {
        const aiResponse = { 
          id: Date.now() + 1, 
          text: generateAIResponse(chatInput), 
          sender: 'ai' 
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const selectOption = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const currentQ = questions[currentQuestion - 1];
  const progress = (currentQuestion / questions.length) * 100;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Brain },
    { id: 'practice', label: 'Practice Tests', icon: FileText },
    { id: 'materials', label: 'Study Materials', icon: BookOpen },
    { id: 'analytics', label: 'Performance Analytics', icon: TrendingUp }
  ];

  const dashboardCards = [
    {
      title: '🤖 AI Personal Tutor',
      description: 'Get instant help with concepts, solve doubts, and receive personalized explanations',
      action: () => setActiveTab('ai-tutor'),
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: '📝 Adaptive Practice Tests',
      description: 'AI-generated questions based on your performance and weak areas',
      action: () => setActiveTab('practice'),
      gradient: 'from-green-500 to-teal-600'
    },
    {
      title: '📚 Smart Study Planner',
      description: 'AI-optimized study schedule based on your progress and exam timeline',
      action: () => alert('🎯 AI Study Planner Activated!\n\nBased on your performance analysis:\n• Focus on Organic Chemistry (30 mins)\n• Practice Physics numericals (45 mins)\n• Review Biology diagrams (15 mins)\n\nOptimal study time: 4:00 PM - 6:30 PM'),
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: '📈 Performance Insights',
      description: 'Detailed analytics and AI recommendations for improvement',
      action: () => setActiveTab('analytics'),
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const studyMaterials = [
    {
      title: '📐 Physics - Mechanics',
      priority: 'High Priority',
      topics: 'Newton\'s Laws, Work-Energy Theorem, Rotational Motion',
      color: 'border-red-500'
    },
    {
      title: '🧪 Chemistry - Organic',
      priority: 'Needs Focus',
      topics: 'Reaction Mechanisms, Stereochemistry, Name Reactions',
      color: 'border-orange-500'
    },
    {
      title: '📊 Mathematics - Calculus',
      priority: 'Maintain Level',
      topics: 'Limits, Derivatives, Integration Techniques',
      color: 'border-green-500'
    },
    {
      title: '🧬 Biology - Genetics',
      priority: 'New Topic',
      topics: 'Mendelian Genetics, DNA Replication, Gene Expression',
      color: 'border-blue-500'
    }
  ];

  const performanceMetrics = [
    { label: 'Overall Score', value: '78%', icon: Award },
    { label: 'Problems Solved', value: '245', icon: Target },
    { label: 'Study Streak', value: '15', icon: Clock },
    { label: 'Accuracy Rate', value: '82%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎓 AI StudyHub
          </h1>
          <p className="text-center text-gray-600 text-xl">
            Your Intelligent Companion for IIT JEE & NEET Success
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/30 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:transform hover:-translate-y-1'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">📊 Your Learning Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  onClick={card.action}
                  className={`bg-gradient-to-r ${card.gradient} text-white p-8 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-white/90">{card.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full w-[65%] transition-all duration-1000"></div>
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold">Overall Progress: 65%</p>
          </div>
        )}

        {/* AI Tutor Tab */}
        {activeTab === 'ai-tutor' && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">🤖 AI Personal Tutor</h2>
            <p className="text-gray-600 mb-6">Ask questions, get concept explanations, and receive step-by-step solutions!</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="h-96 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-left duration-300`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}>
                      <strong>{message.sender === 'user' ? 'You:' : 'AI Tutor:'}</strong> {message.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about JEE/NEET topics..."
                  className="flex-1 p-4 border-2 border-gray-300 rounded-full outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">💡 AI Study Recommendations</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <strong>Focus Area:</strong> Your recent quiz performance shows weakness in Organic Chemistry reactions. I recommend reviewing SN1/SN2 mechanisms.
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <strong>Quick Win:</strong> You're strong in Calculus but could improve integration techniques. Practice more substitution problems.
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <strong>Daily Goal:</strong> Complete 20 Physics numerical problems today to maintain your momentum in Mechanics.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Tests Tab */}
        {activeTab === 'practice' && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">📝 AI-Powered Practice Tests</h2>
            <p className="text-gray-600 mb-6">Adaptive questions that adjust to your skill level and focus on improvement areas.</p>
            
            {!quizCompleted ? (
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="bg-gray-200 h-2 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="mb-6 text-gray-600">Question {currentQuestion} of {questions.length}</p>

                <div className="text-xl font-semibold mb-6 text-gray-800">
                  {currentQ.question}
                </div>

                <div className="grid gap-3 mb-6">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => selectOption(index)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === questions.length ? 'Finish Quiz' : 'Next Question'}
                </button>

                {showExplanation && (
                  <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-xl animate-in slide-in-from-bottom duration-500">
                    <strong className="text-green-800">Explanation:</strong> 
                    <p className="text-green-700 mt-2">{currentQ.explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">🎉 Quiz Completed!</h2>
                <div className="text-6xl font-bold text-indigo-600 mb-4">85%</div>
                <p className="text-xl text-gray-600 mb-6">Great job! You scored 85% on this adaptive practice test.</p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Analysis:</h3>
                  <p className="text-gray-600">You show strong understanding across multiple subjects. Focus on organic chemistry mechanisms and continue practicing physics numericals for optimal performance.</p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Take Another Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* Study Materials Tab */}
        {activeTab === 'materials' && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">📚 AI-Curated Study Materials</h2>
            <p className="text-gray-600 mb-8">Personalized content recommendations based on your learning patterns and performance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyMaterials.map((material, index) => (
                <div key={index} className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${material.color} hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                  <h3 className="text-xl font-bold mb-2">{material.title}</h3>
                  <p className="text-sm font-semibold text-orange-600 mb-3">
                    AI Recommendation: {material.priority}
                  </p>
                  <p className="text-gray-600 mb-4">{material.topics}</p>
                  <button 
                    onClick={() => alert(`📚 Opening ${material.title} study materials...\n\nThis would launch:\n• Interactive video lectures\n• Practice problems with AI hints\n• Concept maps and summaries\n• Previous year question analysis`)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Play size={16} />
                    Study Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">📈 AI Performance Analytics</h2>
            <p className="text-gray-600 mb-8">Detailed insights into your learning progress with AI-powered recommendations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Icon size={32} className="mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <div className="text-white/90">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">🎯 AI Performance Analysis</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <strong>Strength Areas:</strong> Mathematics (Algebra, Trigonometry), Physics (Electromagnetism)
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <strong>Improvement Needed:</strong> Chemistry (Organic reactions), Biology (Plant physiology)
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <strong>Study Pattern:</strong> Most productive during 4-6 PM. Consider scheduling difficult topics during this time.
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <strong>Prediction:</strong> Based on current progress, you're on track to achieve 85% in your next mock test.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudyHub;