import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Calendar, Clock, Brain, BookOpen, Target, 
  MessageCircle, TrendingUp, Bell, Settings, Search, 
  Plus, Edit3, Save, Trash2, Play, Pause, RotateCcw,
  Lightbulb, Award, CheckCircle, AlertCircle, Camera,
  Mic, FileText, BarChart3, Users, Zap, Star
} from 'lucide-react';

const SmartStudyCompanion = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studyTimer, setStudyTimer] = useState({ minutes: 25, seconds: 0, isRunning: false });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [studyPlan, setStudyPlan] = useState([]);
  const [aiChat, setAiChat] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (studyTimer.isRunning) {
      interval = setInterval(() => {
        setStudyTimer(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { ...prev, isRunning: false };
          }
        });
      }, 1000);
    } else if (!studyTimer.isRunning && studyTimer.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [studyTimer.isRunning, studyTimer.seconds, studyTimer.minutes]);

  const startTimer = () => setStudyTimer(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setStudyTimer(prev => ({ ...prev, isRunning: false }));
  const resetTimer = () => setStudyTimer({ minutes: 25, seconds: 0, isRunning: false });

  const Dashboard = () => (
    <div className="space-y-6">
      {/* AI Insights Card */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">AI Study Insights</h2>
            <p className="opacity-90">Your personalized learning companion</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Performance</span>
            </div>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-sm opacity-90">↑ 12% this week</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">Focus Time</span>
            </div>
            <div className="text-2xl font-bold">4.2h</div>
            <div className="text-sm opacity-90">Today's sessions</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" />
              <span className="font-medium">Streak</span>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm opacity-90">Days consistent</div>
          </div>
        </div>
      </div>

      {/* Study Timer */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-orange-500" />
          Pomodoro Timer
        </h3>
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800 mb-4">
            {String(studyTimer.minutes).padStart(2, '0')}:
            {String(studyTimer.seconds).padStart(2, '0')}
          </div>
          <div className="flex justify-center gap-3">
            {!studyTimer.isRunning ? (
              <button onClick={startTimer} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Play className="w-5 h-5" /> Start
              </button>
            ) : (
              <button onClick={pauseTimer} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Pause className="w-5 h-5" /> Pause
              </button>
            )}
            <button onClick={resetTimer} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Today's Plan */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          Today's Study Plan
        </h3>
        <div className="space-y-3">
          {[
            { subject: 'Physics', topic: 'Mechanics - Newton\'s Laws', time: '9:00 AM', duration: '1.5h', status: 'completed' },
            { subject: 'Chemistry', topic: 'Organic Chemistry - Reactions', time: '11:00 AM', duration: '2h', status: 'current' },
            { subject: 'Mathematics', topic: 'Calculus - Integration', time: '2:00 PM', duration: '1.5h', status: 'pending' },
            { subject: 'Biology', topic: 'Cell Biology - Mitosis', time: '4:00 PM', duration: '1h', status: 'pending' }
          ].map((item, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              item.status === 'completed' ? 'bg-green-50 border-green-500' :
              item.status === 'current' ? 'bg-blue-50 border-blue-500' :
              'bg-gray-50 border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-blue-600">{item.subject}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{item.duration}</span>
                    {item.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {item.status === 'current' && <AlertCircle className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-700">{item.topic}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <button className={`px-3 py-1 rounded text-sm font-medium ${
                  item.status === 'completed' ? 'bg-green-500 text-white' :
                  item.status === 'current' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                  'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}>
                  {item.status === 'completed' ? 'Done' : item.status === 'current' ? 'Continue' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Smart Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-yellow-800">Focus on Weak Areas</h4>
                <p className="text-sm text-yellow-700">Your performance in Organic Chemistry has dropped 15%. Consider reviewing reaction mechanisms.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-800">Optimal Study Time</h4>
                <p className="text-sm text-blue-700">Your focus is highest between 9-11 AM. Schedule challenging topics during this time.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-800">Revision Reminder</h4>
                <p className="text-sm text-green-700">It's time to revise Physics concepts from last week to strengthen retention.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AIChat = () => {
    const [messages, setMessages] = useState([
      { type: 'ai', content: "Hi! I'm your AI study companion. I can help you with concepts, solve problems, create study plans, and answer questions about IIT JEE and NEET preparation. What would you like to know?" },
      { type: 'user', content: "Explain Newton's second law of motion" },
      { type: 'ai', content: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically: F = ma\n\nKey points:\n• Force and acceleration are in the same direction\n• Larger force = greater acceleration\n• Larger mass = smaller acceleration for same force\n\nExample: A 2kg ball needs 20N force to accelerate at 10 m/s²" }
    ]);

    const sendMessage = () => {
      if (chatInput.trim()) {
        setMessages(prev => [...prev, { type: 'user', content: chatInput }]);
        // Simulate AI response
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'ai', 
            content: "I understand your question about " + chatInput + ". Let me help you with a detailed explanation and examples relevant to your exam preparation." 
          }]);
        }, 1000);
        setChatInput('');
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg h-96 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            AI Study Assistant
          </h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about your studies..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              onClick={sendMessage}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NotesSection = () => {
    const [notesList, setNotesList] = useState([
      { id: 1, title: "Physics - Motion Laws", content: "Newton's laws of motion summary and key formulas", subject: "Physics", date: "Today" },
      { id: 2, title: "Chemistry - Periodic Trends", content: "Atomic radius, ionization energy, electronegativity trends", subject: "Chemistry", date: "Yesterday" },
      { id: 3, title: "Math - Integration Techniques", content: "By parts, substitution, partial fractions methods", subject: "Mathematics", date: "2 days ago" }
    ]);

    const addNote = () => {
      if (newNote.trim()) {
        const note = {
          id: Date.now(),
          title: `Note ${notesList.length + 1}`,
          content: newNote,
          subject: "General",
          date: "Just now"
        };
        setNotesList([note, ...notesList]);
        setNewNote('');
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-green-500" />
            Quick Note
          </h3>
          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2">
              <button onClick={addNote} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Note
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Camera className="w-4 h-4" /> Photo
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Mic className="w-4 h-4" /> Voice
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            My Notes
          </h3>
          <div className="space-y-3">
            {notesList.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{note.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{note.subject}</span>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Analytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-500" />
          Study Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Study Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">28.5h</div>
            <div className="text-sm text-blue-500">This week</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium">Goals Met</span>
            </div>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-green-500">Daily targets</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Focus Score</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">92</div>
            <div className="text-sm text-orange-500">Average</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Improvement</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">+15%</div>
            <div className="text-sm text-purple-500">vs last week</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Subject-wise Performance</h4>
          {[
            { subject: 'Physics', score: 82, change: '+5%', color: 'blue' },
            { subject: 'Chemistry', score: 76, change: '-2%', color: 'green' },
            { subject: 'Mathematics', score: 89, change: '+8%', color: 'purple' },
            { subject: 'Biology', score: 71, change: '+12%', color: 'orange' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                <span className="font-medium">{item.subject}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded-full h-2 w-32">
                  <div className={`bg-${item.color}-500 rounded-full h-2`} style={{ width: `${item.score}%` }}></div>
                </div>
                <span className="font-medium">{item.score}%</span>
                <span className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Smart Study Companion</h1>
                <p className="text-gray-600">Your AI-powered learning assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-lg overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
            { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
            { id: 'notes', label: 'Smart Notes', icon: Edit3 },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'notes' && <NotesSection />}
            {activeTab === 'analytics' && <Analytics />}
          </div>
          
          <div className="space-y-6">
            {activeTab === 'chat' ? (
              <AIChat />
            ) : (
              <>
                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Today's Goal</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full h-2 w-16">
                          <div className="bg-green-500 rounded-full h-2 w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekly Target</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full h-2 w-16">
                          <div className="bg-blue-500 rounded-full h-2 w-4/5"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold mb-4">Next Up</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Chemistry Quiz</p>
                        <p className="text-xs text-gray-500">in 30 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Math Practice</p>
                        <p className="text-xs text-gray-500">at 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartStudyCompanion;