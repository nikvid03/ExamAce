import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Users, MessageCircle, 
  Share2, Settings, Hand, BookOpen, Calculator, 
  ChevronRight, Clock, User, Bell, Maximize2,
  PenTool, Eraser, Square, Circle, ArrowRight,
  Download, Upload, Eye, EyeOff, Star
} from 'lucide-react';

const LiveClassPlatform = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Dr. Sharma', message: 'Welcome to Physics - Mechanics class!', time: '10:00', isTeacher: true },
    { id: 2, user: 'Rahul', message: 'Thank you sir!', time: '10:01', isTeacher: false },
    { id: 3, user: 'Priya', message: 'Can you explain the previous derivation again?', time: '10:02', isTeacher: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [students] = useState([
    { id: 1, name: 'Rahul Kumar', handRaised: false, speaking: false },
    { id: 2, name: 'Priya Singh', handRaised: true, speaking: false },
    { id: 3, name: 'Amit Patel', handRaised: false, speaking: false },
    { id: 4, name: 'Sneha Gupta', handRaised: false, speaking: true },
    { id: 5, name: 'Vikash Yadav', handRaised: false, speaking: false }
  ]);
  const [activeDrawTool, setActiveDrawTool] = useState('pen');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const classInfo = {
    subject: 'Physics - Mechanics',
    topic: 'Laws of Motion & Friction',
    teacher: 'Dr. Rajesh Sharma',
    duration: '2 hours',
    studentsCount: 156,
    startTime: '10:00 AM'
  };

  const upcomingClasses = [
    { subject: 'Chemistry', topic: 'Organic Chemistry Basics', time: '2:00 PM', teacher: 'Dr. Meera Joshi' },
    { subject: 'Mathematics', topic: 'Calculus - Derivatives', time: '4:00 PM', teacher: 'Prof. Suresh Kumar' },
    { subject: 'Biology', topic: 'Cell Structure & Function', time: '6:00 PM', teacher: 'Dr. Anita Rao' }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = activeDrawTool === 'eraser' ? 20 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = activeDrawTool === 'eraser' ? '#ffffff' : '#2563eb';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{classInfo.subject}</h1>
              <p className="text-blue-200 text-sm">{classInfo.topic}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Started: {classInfo.startTime}</span>
            <span className="bg-green-500 px-2 py-1 rounded-full text-xs">LIVE</span>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 bg-black/30 backdrop-blur-sm m-4 rounded-2xl overflow-hidden relative">
            {/* Teacher Video */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl border-2 border-white/20 z-10">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-70" />
                  <p className="text-sm font-medium">{classInfo.teacher}</p>
                </div>
              </div>
            </div>

            {/* Interactive Whiteboard */}
            <div className="relative w-full h-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="bg-white/90 rounded-lg shadow-2xl cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              
              {/* Drawing Tools */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-xl p-2 space-y-2">
                <button
                  onClick={() => setActiveDrawTool('pen')}
                  className={`p-2 rounded-lg transition-all ${activeDrawTool === 'pen' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                >
                  <PenTool className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveDrawTool('eraser')}
                  className={`p-2 rounded-lg transition-all ${activeDrawTool === 'eraser' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                >
                  <Eraser className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveDrawTool('square')}
                  className={`p-2 rounded-lg transition-all ${activeDrawTool === 'square' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                >
                  <Square className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveDrawTool('circle')}
                  className={`p-2 rounded-lg transition-all ${activeDrawTool === 'circle' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                >
                  <Circle className="w-5 h-5" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-45" />
                </button>
              </div>

              {/* Formula Examples */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 max-w-md">
                <h3 className="text-sm font-semibold mb-2 text-blue-300">Key Formulas:</h3>
                <div className="space-y-1 text-xs">
                  <p>• F = ma (Newton's Second Law)</p>
                  <p>• f = μN (Friction Force)</p>
                  <p>• v² = u² + 2as (Kinematic Equation)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-black/40 backdrop-blur-sm mx-4 mb-4 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-xl transition-all ${isVideoOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 rounded-xl transition-all ${isAudioOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className={`p-3 rounded-xl transition-all ${isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                  <Hand className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gray-600 hover:bg-gray-700 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-2 rounded-lg">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">{classInfo.studentsCount} Students</span>
                </div>
                <button className="p-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
                  Leave Class
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-black/30 backdrop-blur-sm border-l border-white/10">
          {/* Tab Navigation */}
          <div className="flex bg-black/40">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${activeTab === 'students' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Students
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${activeTab === 'resources' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Resources
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`${msg.isTeacher ? 'bg-blue-500/20' : 'bg-white/5'} rounded-lg p-3`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${msg.isTeacher ? 'text-blue-300' : 'text-gray-300'}`}>
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="p-4 space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${student.speaking ? 'bg-green-500' : 'bg-gray-600'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{student.name}</span>
                    </div>
                    {student.handRaised && (
                      <Hand className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-4 space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Materials
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Physics_Notes_Ch5.pdf</span>
                      <Download className="w-4 h-4 hover:text-blue-400 cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Friction_Problems.pdf</span>
                      <Download className="w-4 h-4 hover:text-blue-400 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Calculator className="w-4 h-4 mr-2" />
                    Quick Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-500/20 hover:bg-blue-500/30 rounded-lg p-2 text-xs transition-all">
                      Calculator
                    </button>
                    <button className="bg-purple-500/20 hover:bg-purple-500/30 rounded-lg p-2 text-xs transition-all">
                      Formula Sheet
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Upcoming Classes</h3>
                  <div className="space-y-3">
                    {upcomingClasses.map((cls, index) => (
                      <div key={index} className="text-xs">
                        <div className="font-medium text-blue-300">{cls.subject}</div>
                        <div className="text-gray-400">{cls.topic}</div>
                        <div className="text-gray-500">{cls.time} • {cls.teacher}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClassPlatform;