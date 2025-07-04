import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BookOpen, Award, Clock, TrendingUp, Users, Target, Calendar, Brain, ChevronRight, Play, CheckCircle, XCircle } from 'lucide-react';

const JEENEETEducationPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedExam, setSelectedExam] = useState('JEE');
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState([]);

  // Sample data
  const performanceData = [
    { subject: 'Physics', jee: 85, neet: 78, target: 90 },
    { subject: 'Chemistry', jee: 92, neet: 88, target: 95 },
    { subject: 'Mathematics', jee: 78, neet: 0, target: 85 },
    { subject: 'Biology', jee: 0, neet: 82, target: 90 }
  ];

  const weeklyProgress = [
    { week: 'Week 1', score: 65, timeSpent: 35 },
    { week: 'Week 2', score: 72, timeSpent: 42 },
    { week: 'Week 3', score: 78, timeSpent: 38 },
    { week: 'Week 4', score: 85, timeSpent: 45 },
    { week: 'Week 5', score: 82, timeSpent: 40 },
    { week: 'Week 6', score: 88, timeSpent: 48 }
  ];

  const subjectDistribution = [
    { name: 'Physics', value: 35, color: '#8B5CF6' },
    { name: 'Chemistry', value: 30, color: '#06B6D4' },
    { name: 'Mathematics', value: 25, color: '#10B981' },
    { name: 'Biology', value: 10, color: '#F59E0B' }
  ];

  const practiceTests = [
    { id: 1, name: 'Physics - Mechanics', questions: 30, duration: 60, difficulty: 'Medium', completed: true, score: 85 },
    { id: 2, name: 'Chemistry - Organic', questions: 25, duration: 45, difficulty: 'Hard', completed: true, score: 78 },
    { id: 3, name: 'Mathematics - Calculus', questions: 20, duration: 40, difficulty: 'Medium', completed: false, score: null },
    { id: 4, name: 'Physics - Thermodynamics', questions: 30, duration: 60, difficulty: 'Easy', completed: false, score: null }
  ];

  const mockTests = [
    { id: 1, name: 'JEE Main Mock Test 1', date: '2025-01-15', score: 245, rank: 1250, percentile: 94.5 },
    { id: 2, name: 'NEET Mock Test 1', date: '2025-01-20', score: 580, rank: 850, percentile: 96.2 },
    { id: 3, name: 'JEE Advanced Mock 1', date: '2025-01-25', score: 156, rank: 2100, percentile: 91.8 }
  ];

  const radarData = [
    { subject: 'Physics', current: 85, target: 90 },
    { subject: 'Chemistry', current: 92, target: 95 },
    { subject: 'Mathematics', current: 78, target: 85 },
    { subject: 'Problem Solving', current: 80, target: 88 },
    { subject: 'Speed', current: 75, target: 85 },
    { subject: 'Accuracy', current: 88, target: 92 }
  ];

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Overall Score</p>
              <p className="text-3xl font-bold">85.2%</p>
            </div>
            <Award className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100">Tests Completed</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <CheckCircle className="h-8 w-8 text-cyan-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Study Hours</p>
              <p className="text-3xl font-bold">156h</p>
            </div>
            <Clock className="h-8 w-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Current Rank</p>
              <p className="text-3xl font-bold">1,248</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Weekly Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} />
            <Line type="monotone" dataKey="timeSpent" stroke="#06B6D4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Subject-wise Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={selectedExam.toLowerCase() === 'jee' ? 'jee' : 'neet'} fill="#8B5CF6" />
              <Bar dataKey="target" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Study Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Study Time Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Skill Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Current" dataKey="current" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              <Radar name="Target" dataKey="target" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.1} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Mock Tests */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Mock Tests</h3>
          <div className="space-y-4">
            {mockTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{test.name}</h4>
                  <p className="text-sm text-gray-600">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">{test.score} marks</p>
                  <p className="text-sm text-gray-600">Rank: {test.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Performance */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Detailed Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h4 className="text-lg font-semibold text-green-700">Strengths</h4>
            <ul className="mt-2 text-sm text-green-600">
              <li>• Chemistry - Organic reactions</li>
              <li>• Physics - Mechanics</li>
              <li>• Quick problem solving</li>
            </ul>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <h4 className="text-lg font-semibold text-amber-700">Areas to Improve</h4>
            <ul className="mt-2 text-sm text-amber-600">
              <li>• Mathematics - Calculus</li>
              <li>• Physics - Thermodynamics</li>
              <li>• Time management</li>
            </ul>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-700">Recommendations</h4>
            <ul className="mt-2 text-sm text-blue-600">
              <li>• Focus on weak topics</li>
              <li>• Practice more mock tests</li>
              <li>• Review incorrect answers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const Practice = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Practice Tests</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedExam('JEE')}
            className={`px-4 py-2 rounded-lg ${selectedExam === 'JEE' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            JEE
          </button>
          <button 
            onClick={() => setSelectedExam('NEET')}
            className={`px-4 py-2 rounded-lg ${selectedExam === 'NEET' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            NEET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{test.name}</h3>
              {test.completed ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Play className="h-6 w-6 text-purple-500" />
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium">{test.questions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{test.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`font-medium ${
                  test.difficulty === 'Easy' ? 'text-green-600' :
                  test.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                }`}>{test.difficulty}</span>
              </div>
              {test.completed && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-medium text-purple-600">{test.score}%</span>
                </div>
              )}
            </div>

            <button className={`w-full py-2 px-4 rounded-lg font-medium ${
              test.completed 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}>
              {test.completed ? 'Review' : 'Start Test'}
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Practice Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">156</p>
            <p className="text-gray-600">Tests Attempted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-gray-600">Average Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">45h</p>
            <p className="text-gray-600">Practice Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">234</p>
            <p className="text-gray-600">Rank Improvement</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">EduAnalytics Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Arjun Sharma</p>
                <p className="text-xs text-gray-500">JEE/NEET Aspirant</p>
              </div>
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'practice', label: 'Practice', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'practice' && <Practice />}
      </main>
    </div>
  );
};

export default JEENEETEducationPlatform;