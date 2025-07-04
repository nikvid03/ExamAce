import React, { useState } from 'react';
import { BookOpen, Target, Users, Trophy, Clock, ChevronRight, Play, Star, CheckCircle, ArrowRight, Menu, X, User, Mail, Phone, Calendar, GraduationCap, MapPin, FileText, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FreeTrialForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    targetExam: '',
    currentClass: '',
    city: '',
    state: '',
    preferredSubjects: [],
    studyHours: '',
    previousScore: '',
    targetScore: '',
    agreeToTerms: false,
    receiveUpdates: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.includes(subject)
        ? prev.preferredSubjects.filter(s => s !== subject)
        : [...prev.preferredSubjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleTakeAssessment = () => {
    navigate('/assessment');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">Welcome to ExamAce!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Your free trial has been activated successfully. Check your email for login credentials and next steps.
            </p>
            <div className="space-y-6">
              <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">What's Next?</h3>
                <ul className="text-gray-300 text-left space-y-2">
                  <li>• Check your email for login credentials</li>
                  <li>• Complete your profile setup</li>
                  <li>• Take your first diagnostic test</li>
                  <li>• Access 7 days of premium content</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center"
                  onClick={handleTakeAssessment}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Take Assessment
                </button>
                
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center">
                  <Target className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </button>
                <button
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                  onClick={() => navigate('/discussion')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Discussion</span>
                </button>
              </div>
              
              <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30 mt-6">
                <p className="text-green-300 text-sm">
                  💡 <strong>Tip:</strong> Start with the assessment to get personalized study recommendations based on your current knowledge level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 focus:outline-none"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ExamAce</span>
            </div>
            <div className="text-white">
              <span className="text-sm text-gray-300">Step {currentStep} of 3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 mx-4 ${
                    step < currentStep ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>Personal Info</span>
            <span>Academic Details</span>
            <span>Preferences</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Start Your Free Trial</h1>
            <p className="text-xl text-gray-300">7 days of premium access, completely free!</p>
          </div>

          <div className="space-y-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3" />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="MH">Maharashtra</option>
                      <option value="KA">Karnataka</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="DL">Delhi</option>
                      <option value="GJ">Gujarat</option>
                      <option value="RJ">Rajasthan</option>
                      <option value="WB">West Bengal</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="HR">Haryana</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Academic Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Target Exam *</label>
                    <select
                      name="targetExam"
                      value={formData.targetExam}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your target exam</option>
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Advanced">JEE Advanced</option>
                      <option value="NEET">NEET</option>
                      <option value="Both JEE & NEET">Both JEE & NEET</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Current Class *</label>
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your class</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="12th Pass">12th Pass</option>
                      <option value="Dropper">Dropper</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Preferred Subjects (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subject) => (
                      <label key={subject} className="flex items-center bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.preferredSubjects.includes(subject)}
                          onChange={() => handleSubjectChange(subject)}
                          className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-white">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Previous Score (if any)</label>
                    <input
                      type="text"
                      name="previousScore"
                      value={formData.previousScore}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., JEE Main: 95 percentile"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Target Score/Rank</label>
                    <input
                      type="text"
                      name="targetScore"
                      value={formData.targetScore}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., AIR under 1000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3" />
                  Study Preferences
                </h2>
                
                <div>
                  <label className="block text-white font-medium mb-3">Daily Study Hours *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['2-4 hours', '4-6 hours', '6-8 hours', '8+ hours'].map((hours) => (
                      <label key={hours} className="flex items-center bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          type="radio"
                          name="studyHours"
                          value={hours}
                          checked={formData.studyHours === hours}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-white">{hours}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Free Trial Includes:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Access to all video lectures
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      10 practice tests
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Doubt clearing sessions
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      Performance analytics
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-300">
                      I agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> *
                    </span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-300">
                      I want to receive study tips, exam updates, and promotional offers via email
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 1 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.agreeToTerms}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Starting Trial...
                    </>
                  ) : (
                    <>
                      Start Free Trial
                      <Trophy className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialForm;