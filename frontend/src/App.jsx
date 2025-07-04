import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Users, Trophy, Clock, ChevronRight, Play, Star, CheckCircle, ArrowRight, Menu, X, Brain, Zap, BarChart3, Video, MessageCircle, Calendar, Award, TrendingUp, Eye, Lightbulb, Smartphone, Headphones, Globe, Shield, Cpu, Gamepad2 } from 'lucide-react';
import FreeTrialForm from './components/freeTrial.jsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MentorshipProgram from './components/mentorship.jsx';
import AssessmentPlatform from './components/assesment.jsx';
import Solutions from './components/solutions.jsx';
import Discussion from './components/discussion.jsx';
import AiPowered from './components/aiPowered.jsx';
import ArVR from './components/arVR.jsx';
import AdvancedANL from './components/advancedANL.jsx';
import Live from './components/live.jsx';
import Game from './components/game.jsx';
import Smart from './components/smart.jsx';
import Neural from './components/neural.jsx';

const JEENEETApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('JEE');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAIFeature, setCurrentAIFeature] = useState(0);
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [showMentorship, setShowMentorship] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Adaptive AI that personalizes your study plan based on learning patterns and performance",
      badge: "NEW"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "AR/VR Study Mode",
      description: "Immersive 3D visualizations for complex Physics and Chemistry concepts",
      badge: "BETA"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Deep performance insights with predictive modeling and weakness identification",
      badge: "PRO"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Interactive Classes",
      description: "Real-time doubt solving with top educators and peer collaboration"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Gamified Learning",
      description: "Earn XP, unlock achievements, and compete with friends while studying",
      badge: "HOT"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Smart Study Companion",
      description: "AI chatbot for instant doubt resolution and concept explanations"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Neural Network Testing",
      description: "ML-powered test generation that adapts difficulty based on your skill level"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Leaderboards",
      description: "Compete with students worldwide and track your international ranking"
    }
  ];

  const aiFeatures = [
    {
      title: "Smart Study Planner",
      description: "AI creates optimal study schedules based on your goals, current level, and available time",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Weakness Detector",
      description: "Machine learning identifies your weak areas and suggests targeted practice",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Performance Predictor",
      description: "Predicts your exam performance and suggests improvement strategies",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Concept Visualizer",
      description: "AI generates visual explanations for complex topics using AR/VR technology",
      icon: <Eye className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const testimonials = [
    {
      name: "Arjun Sharma",
      exam: "JEE Advanced",
      rank: "AIR 47",
      text: "The AI study planner was a game-changer! It knew exactly what I needed to focus on each day.",
      image: "🎓",
      improvement: "+45%"
    },
    {
      name: "Priya Patel",
      exam: "NEET",
      rank: "AIR 156",
      text: "The AR biology visualizations helped me understand complex processes like never before.",
      image: "🔬",
      improvement: "+52%"
    },
    {
      name: "Rohit Kumar",
      exam: "JEE Main",
      rank: "AIR 89",
      text: "Gamified learning made studying addictive! I earned 15,000 XP in my last month of prep.",
      image: "⚡",
      improvement: "+38%"
    }
  ];

  const analyticsData = [
    { subject: "Physics", score: 85, trend: "+12%", status: "strong" },
    { subject: "Chemistry", score: 78, trend: "+8%", status: "improving" },
    { subject: "Mathematics", score: 92, trend: "+15%", status: "excellent" },
    { subject: "Biology", score: 71, trend: "+5%", status: "needs-work" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const aiTimer = setInterval(() => {
      setCurrentAIFeature((prev) => (prev + 1) % aiFeatures.length);
    }, 3000);
    return () => clearInterval(aiTimer);
  }, [aiFeatures.length]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-400';
      case 'strong': return 'text-blue-400';
      case 'improving': return 'text-yellow-400';
      case 'needs-work': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ExamAce</span>
              <div className="hidden sm:block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                AI POWERED
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">AI Features</a>
              <a href="#courses" className="text-gray-300 hover:text-white transition-colors">Courses</a>
              <a href="#analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Success Stories</a>
              <div className="flex items-center space-x-3">
                <button
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                  onClick={() => navigate('/mentorship')}
                >
                  <Users className="w-4 h-4" />
                  <span>Mentorship</span>
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  onClick={() => navigate('/free-trial')}
                >
                  Start Free Trial
                </button>

                
<button
  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2"
  onClick={() => navigate('/discussion')}
>
  <MessageCircle className="w-4 h-4" />
  <span>Discussion</span>
</button>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-gray-300 hover:text-white transition-colors">AI Features</a>
                <a href="#courses" className="block text-gray-300 hover:text-white transition-colors">Courses</a>
                <a href="#analytics" className="block text-gray-300 hover:text-white transition-colors">Analytics</a>
                <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">Success Stories</a>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  onClick={() => setShowFreeTrial(true)}
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Free Trial Modal Overlay */}
      {showFreeTrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <FreeTrialForm onClose={() => setShowFreeTrial(false)} />
        </div>
      )}

      {/* Mentorship Modal Overlay */}
      {showMentorship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <MentorshipProgram onClose={() => setShowMentorship(false)} />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 mb-8 border border-white/20">
              <Brain className="w-5 h-5 text-cyan-400 mr-2" />
              <span className="text-white text-sm font-medium">AI-Powered • Trusted by 50,000+ Students</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Next-Gen <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">AI Learning</span>
              <br />for JEE & NEET
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered platform with AR/VR visualization, gamified learning, 
              and neural network-based testing. The future of competitive exam preparation is here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
                onClick={() => navigate('/ai-powered')}
              >
                Experience AI Learning
                <Zap className="inline-block ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="group flex items-center bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch AI Demo
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {[
                { number: "50K+", label: "AI Students", icon: <Users className="w-4 h-4" /> },
                { number: "98.5%", label: "Success Rate", icon: <Trophy className="w-4 h-4" /> },
                { number: "1M+", label: "AI Predictions", icon: <Brain className="w-4 h-4" /> },
                { number: "500+", label: "Smart Tests", icon: <Target className="w-4 h-4" /> },
                { number: "24/7", label: "AI Support", icon: <MessageCircle className="w-4 h-4" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                    <div className="text-2xl md:text-3xl font-bold text-white ml-2">{stat.number}</div>
                  </div>
                  <div className="text-gray-400 text-xs uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powered by <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Artificial Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of learning with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {aiFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-500 ${
                    index === currentAIFeature ? 'scale-105 bg-white/15 border-white/30' : 'hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI Learning Engine</h3>
                  <p className="text-gray-300 mb-6">
                    Our neural network processes millions of data points to create the perfect learning experience for you
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-cyan-400 font-bold">95%</div>
                      <div className="text-gray-400">Accuracy</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-blue-400 font-bold">2.3x</div>
                      <div className="text-gray-400">Faster Learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section id="analytics" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Advanced Performance Analytics</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deep insights powered by machine learning to track your progress and predict success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Performance Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Performance Dashboard</h3>
                <button 
                  onClick={() => setIsAnalyticsVisible(!isAnalyticsVisible)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  {isAnalyticsVisible ? 'Hide' : 'Show'} Analytics
                </button>
              </div>

              {isAnalyticsVisible && (
                <div className="space-y-4 animate-fade-in">
                  {analyticsData.map((subject, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{subject.subject}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${getStatusColor(subject.status)}`}>
                            {subject.trend}
                          </span>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-400 mt-1">{subject.score}%</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Predictions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">AI Predictions</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">AIR 1,247</div>
                  <div className="text-gray-300">Predicted JEE Main Rank</div>
                  <div className="text-sm text-gray-400 mt-1">Based on current performance</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">Top 5%</div>
                    <div className="text-gray-400 text-sm">National Ranking</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">87%</div>
                    <div className="text-gray-400 text-sm">Success Probability</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-4 border border-green-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Focus on Organic Chemistry and Calculus this week to boost your score by 15-20 points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Selection */}
      <section id="courses" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">AI-Enhanced Courses</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized preparation programs with cutting-edge AI technology
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
              {['JEE', 'NEET'].map((exam) => (
                <button
                  key={exam}
                  onClick={() => setActiveTab(exam)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === exam
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {exam} AI Course
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === 'JEE' ? [
              { 
                title: "JEE Main AI", 
                subjects: ["AI-Powered Physics", "Smart Chemistry", "Adaptive Mathematics"], 
                duration: "12 Months", 
                price: "₹19,999",
                features: ["AR Visualization", "AI Tutor", "Neural Testing"],
                popular: false
              },
              { 
                title: "JEE Advanced Pro", 
                subjects: ["Advanced AI Physics", "ML Chemistry", "Quantum Mathematics"], 
                duration: "6 Months", 
                price: "₹16,999",
                features: ["VR Lab", "Predictive Analytics", "Expert AI"],
                popular: true
              },
              { 
                title: "Complete JEE Elite", 
                subjects: ["Full AI Syllabus", "Smart Mock Tests", "Instant Doubt AI"], 
                duration: "18 Months", 
                price: "₹29,999",
                features: ["All Features", "Personal AI Mentor", "Guaranteed Results"],
                popular: false
              }
            ] : [
              { 
                title: "NEET Foundation AI", 
                subjects: ["AI Physics", "Smart Chemistry", "Bio Visualization"], 
                duration: "12 Months", 
                price: "₹18,999",
                features: ["3D Biology", "AI Tutor", "Smart Testing"],
                popular: false
              },
              { 
                title: "NEET Intensive Pro", 
                subjects: ["Advanced Biology AI", "Organic Chem AI", "Medical Physics"], 
                duration: "8 Months", 
                price: "₹22,999",
                features: ["AR Anatomy", "Predictive Scoring", "Expert AI"],
                popular: true
              },
              { 
                title: "NEET Complete Elite", 
                subjects: ["Full AI Syllabus", "Smart Mock Tests", "Medical AI Prep"], 
                duration: "15 Months", 
                price: "₹27,999",
                features: ["All Features", "Personal AI Mentor", "Guaranteed Results"],
                popular: false
              }
            ]).map((course, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105 relative ${course.popular ? 'ring-2 ring-blue-400' : ''}`}>
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{course.price}</div>
                  <div className="text-gray-400">{course.duration}</div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {course.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      {subject}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-8">
                  <div className="text-white font-semibold text-sm">AI Features:</div>
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  Start AI Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Revolutionary Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Next-generation technology that transforms how you learn and prepare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group relative cursor-pointer"
                onClick={() => {
                  if (feature.title === 'AI-Powered Learning') navigate('/ai-powered');
                  else if (feature.title === 'AR/VR Study Mode') navigate('/ar-vr');
                  else if (feature.title === 'Advanced Analytics') navigate('/advanced-analytics');
                  else if (feature.title === 'Live Interactive Classes') navigate('/live');
                  else if (feature.title === 'Gamified Learning') navigate('/game');
                  else if (feature.title === 'Smart Study Companion') navigate('/smart');
                }}
              >
                {feature.badge && (
                  <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
                    feature.badge === 'NEW' ? 'bg-green-500' :
                    feature.badge === 'BETA' ? 'bg-orange-500' :
                    feature.badge === 'PRO' ? 'bg-purple-500' :
                    'bg-red-500'
                  } text-white`}>
                    {feature.badge}
                  </div>
                )}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">AI Success Stories</h2>
            <p className="text-xl text-gray-300">Real results from students using our AI platform</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-6">{testimonials[currentSlide].image}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                  "{testimonials[currentSlide].text}"
                </blockquote>
                <div className="text-lg font-semibold text-white">{testimonials[currentSlide].name}</div>
                <div className="text-blue-400 font-medium mb-4">{testimonials[currentSlide].exam} - {testimonials[currentSlide].rank}</div>
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-3 inline-block">
                  <span className="text-green-400 font-bold">Performance Improvement: {testimonials[currentSlide].improvement}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Gamified <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Learning Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Level up your learning with achievements, XP points, and competitive challenges
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* XP System */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">XP & Levels</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">Level 23</div>
                    <div className="text-gray-300 text-sm">Advanced Scholar</div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <div className="text-gray-300 text-sm">2,450 / 3,000 XP to next level</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-white text-sm">Speed Demon</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-white text-sm">Perfect Score</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 opacity-50">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="text-white text-sm">Elite Scholar</span>
                    </div>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-green-400/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global Rank</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-gold/20 to-yellow/20 rounded-lg p-3 border border-yellow-400/20">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-bold">#1 Arjun S.</span>
                      <span className="text-white">15,840 XP</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">#2 Priya P.</span>
                      <span className="text-white">15,235 XP</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-3 border border-green-400/30">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">#12 You</span>
                      <span className="text-white">12,450 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of education with our advanced tech stack
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Eye className="w-8 h-8" />,
                title: "AR/VR Learning",
                description: "Immersive 3D visualizations for complex concepts",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Neural Networks",
                description: "AI that adapts to your learning style",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "Voice AI Tutor",
                description: "Natural language interaction for doubt clearing",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Blockchain Certificates",
                description: "Secure, verifiable achievement records",
                color: "from-orange-500 to-red-500"
              }
            ].map((tech, index) => (
              <div key={index} className="group text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{tech.title}</h3>
                <p className="text-gray-400 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
            <div className="relative">
              <div className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Zap className="w-4 h-4 mr-2" />
                LIMITED TIME: 50% OFF FIRST MONTH
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Experience the Future of Learning?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the AI revolution in education. Start your journey with cutting-edge technology today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl">
                  Start AI Learning Now
                </button>
                <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                  Book AI Demo
                </button>
              </div>
              <div className="text-gray-400 text-sm">
                ✓ 7-day free trial ✓ No credit card required ✓ Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black/40 backdrop-blur-lg py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">ExamAce</span>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  AI
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Revolutionizing competitive exam preparation with cutting-edge AI technology, 
                AR/VR learning, and gamified experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">AI Courses</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Brain className="w-3 h-3 mr-2" />JEE AI Main</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Brain className="w-3 h-3 mr-2" />JEE AI Advanced</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Brain className="w-3 h-3 mr-2" />NEET AI Complete</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Eye className="w-3 h-3 mr-2" />AR/VR Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Cpu className="w-3 h-3 mr-2" />Neural Networks</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Gamepad2 className="w-3 h-3 mr-2" />Gamification</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">AI Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">24/7 AI Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-400/20">
                <div className="text-white text-sm font-semibold">AI Support Online</div>
                <div className="text-gray-400 text-xs">Get instant help 24/7</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 ExamAce AI. All rights reserved. Powered by Advanced Neural Networks.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure Learning
              </span>
              <span className="flex items-center">
                <Cpu className="w-4 h-4 mr-1" />
                AI Certified
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<JEENEETApp />} />
      <Route path="/mentorship" element={<MentorshipProgram />} />
      <Route path="/free-trial" element={<FreeTrialForm onClose={() => {}} />} />
      <Route path="/assessment" element={<AssessmentPlatform />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/discussion" element={<Discussion />} />
      <Route path="/ai-powered" element={<AiPowered />} />
      <Route path="/ar-vr" element={<ArVR />} />
      <Route path="/advanced-analytics" element={<AdvancedANL />} />
      <Route path="/live" element={<Live />} />
      <Route path="/game" element={<Game />} />
      <Route path="/smart" element={<Smart />} />
      <Route path="/neural" element={<Neural />} />
    </Routes>
  </Router>
);

export default AppRoutes;