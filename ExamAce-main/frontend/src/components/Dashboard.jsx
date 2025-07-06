import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Calendar,
  LogOut,
  Settings,
  Play,
  Eye,
  Star,
  Award,
  Brain,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    totalTime: 0,
    rank: 0,
  });
  const [recentTests, setRecentTests] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user's test results
      const testResults = await apiService.getTestResults();
      setRecentTests(testResults.slice(0, 5));
      
      // Calculate stats
      const totalTests = testResults.length;
      const avgScore = totalTests > 0 
        ? testResults.reduce((sum, result) => sum + result.percentage, 0) / totalTests 
        : 0;
      const totalTime = testResults.reduce((sum, result) => sum + (result.timeTaken || 0), 0);
      
      setStats({
        testsCompleted: totalTests,
        averageScore: Math.round(avgScore),
        totalTime: Math.round(totalTime / 60), // Convert to minutes
        rank: Math.floor(Math.random() * 1000) + 1, // Mock rank for now
      });

      // Load available tests
      const tests = await apiService.getTests({ limit: 6 });
      setAvailableTests(tests);

      // Mock performance data
      setPerformanceData([
        { subject: 'Physics', score: 85, trend: '+12%', status: 'strong' },
        { subject: 'Chemistry', score: 78, trend: '+8%', status: 'improving' },
        { subject: 'Mathematics', score: 92, trend: '+15%', status: 'excellent' },
        { subject: 'Biology', score: 71, trend: '+5%', status: 'needs-work' }
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-400';
      case 'strong': return 'text-blue-400';
      case 'improving': return 'text-yellow-400';
      case 'needs-work': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'excellent': return 'bg-green-500/20';
      case 'strong': return 'bg-blue-500/20';
      case 'improving': return 'bg-yellow-500/20';
      case 'needs-work': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ExamAce Dashboard</h1>
                <p className="text-sm text-gray-300">Welcome back, {user?.name || 'Student'}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Tests Completed</p>
                <p className="text-2xl font-bold text-white">{stats.testsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Study Time</p>
                <p className="text-2xl font-bold text-white">{stats.totalTime}m</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Global Rank</p>
                <p className="text-2xl font-bold text-white">#{stats.rank}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Analytics */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Performance Analytics</h2>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusBg(item.status)}`}></div>
                      <span className="text-white font-medium">{item.subject}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-white font-bold">{item.score}%</span>
                      <span className={`text-sm ${getStatusColor(item.status)}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/assessment')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white"
                >
                  <Play className="w-5 h-5" />
                  <span>Start New Test</span>
                </button>
                <button 
                  onClick={() => navigate('/mentorship')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all text-white"
                >
                  <Users className="w-5 h-5" />
                  <span>Book Mentorship</span>
                </button>
                <button 
                  onClick={() => navigate('/discussion')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all text-white"
                >
                  <Brain className="w-5 h-5" />
                  <span>AI Discussion</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentTests.length > 0 ? (
                  recentTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                      <div>
                        <p className="text-white text-sm font-medium">{test.testId?.title || 'Test'}</p>
                        <p className="text-gray-400 text-xs">{new Date(test.completedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{test.percentage}%</p>
                        <p className="text-gray-400 text-xs">{test.timeTaken}m</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No recent tests completed</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Available Tests */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Available Tests</h2>
              <button 
                onClick={() => navigate('/assessment')}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTests.slice(0, 6).map((test, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{test.title}</span>
                    <span className="text-xs text-gray-400">{test.subject}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 text-sm">{test.questions?.length || 0} questions</span>
                    <span className="text-gray-300 text-sm">{test.duration || 60}m</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/assessment/${test._id}`)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Test</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 