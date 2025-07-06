import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  HelpCircle, 
  Star, 
  ThumbsUp, 
  Reply, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  UserCheck, 
  Clock, 
  TrendingUp,
  Award,
  ChevronDown,
  Pin,
  Eye,
  MessageSquare,
  Tag,
  User,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

const DiscussionForums = () => {
  const [activeTab, setActiveTab] = useState('boards');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: '📚', color: 'from-blue-500 to-purple-500' },
    { id: 'physics', name: 'Physics', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-blue-500' },
    { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'from-purple-500 to-pink-500' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-green-500 to-teal-500' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Doubt in Organic Chemistry - Nomenclature",
      content: "I'm struggling with IUPAC nomenclature rules for complex organic compounds. Can someone explain the priority order?",
      author: "Priya Sharma",
      avatar: "👩‍🎓",
      subject: "chemistry",
      category: "doubt",
      replies: 23,
      views: 156,
      likes: 45,
      isPinned: true,
      isAnswered: true,
      timestamp: "2 hours ago",
      tags: ["organic-chemistry", "nomenclature", "iupac"]
    },
    {
      id: 2,
      title: "JEE Main 2025 - Physics Preparation Strategy",
      content: "What's the best approach to cover entire physics syllabus in 6 months? Need guidance on time management.",
      author: "Arjun Kumar",
      avatar: "👨‍🎓",
      subject: "physics",
      category: "discussion",
      replies: 18,
      views: 234,
      likes: 32,
      isPinned: false,
      isAnswered: false,
      timestamp: "4 hours ago",
      tags: ["jee-main", "strategy", "time-management"]
    },
    {
      id: 3,
      title: "Study Group for NEET Biology - Online Sessions",
      content: "Looking for 4-5 serious students to form a study group for NEET biology. We can discuss topics daily.",
      author: "Sneha Patel",
      avatar: "👩‍🔬",
      subject: "biology",
      category: "study-group",
      replies: 12,
      views: 89,
      likes: 28,
      isPinned: false,
      isAnswered: false,
      timestamp: "6 hours ago",
      tags: ["neet", "study-group", "biology"]
    },
    {
      id: 4,
      title: "Calculus Integration Techniques - Need Help",
      content: "Can someone explain integration by parts with some complex examples? I'm finding it difficult to identify u and dv.",
      author: "Rohit Singh",
      avatar: "👨‍💻",
      subject: "mathematics",
      category: "doubt",
      replies: 15,
      views: 178,
      likes: 38,
      isPinned: false,
      isAnswered: true,
      timestamp: "8 hours ago",
      tags: ["calculus", "integration", "techniques"]
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "JEE Physics Masters",
      members: 24,
      subject: "physics",
      description: "Advanced physics discussions and problem solving",
      isActive: true,
      nextSession: "Today 8:00 PM"
    },
    {
      id: 2,
      name: "NEET Biology Squad",
      members: 18,
      subject: "biology",
      description: "Comprehensive biology preparation group",
      isActive: true,
      nextSession: "Tomorrow 6:00 PM"
    },
    {
      id: 3,
      name: "Math Problem Solvers",
      members: 32,
      subject: "mathematics",
      description: "Daily math problem discussions and solutions",
      isActive: false,
      nextSession: "Sunday 5:00 PM"
    }
  ];

  const topContributors = [
    { name: "Dr. Rajesh Kumar", role: "Faculty", points: 2850, avatar: "👨‍🏫", badge: "Expert" },
    { name: "Anjali Verma", role: "Student", points: 1240, avatar: "👩‍🎓", badge: "Helper" },
    { name: "Vikash Jha", role: "Alumni", points: 980, avatar: "🎓", badge: "Mentor" }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSubject = selectedSubject === 'all' || post.subject === selectedSubject;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'doubt': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'discussion': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'study-group': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Discussion Forums</h1>
              <p className="text-gray-300">Connect, Learn, and Grow Together</p>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="space-y-2">
                {[
                  { id: 'boards', label: 'Discussion Boards', icon: MessageCircle },
                  { id: 'doubts', label: 'Doubt Clearing', icon: HelpCircle },
                  { id: 'groups', label: 'Study Groups', icon: Users },
                  { id: 'faculty', label: 'Faculty Zone', icon: Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Subjects</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-all ${
                      selectedSubject === subject.id
                        ? 'bg-gradient-to-r ' + subject.color + ' text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-3">{subject.icon}</span>
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-2xl mr-3">{contributor.avatar}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{contributor.name}</div>
                      <div className="text-gray-400 text-xs">{contributor.points} points</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contributor.badge === 'Expert' ? 'bg-yellow-500/20 text-yellow-300' :
                      contributor.badge === 'Helper' ? 'bg-green-500/20 text-green-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {contributor.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-300 hover:text-white hover:bg-white/20 transition-all flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'boards' && (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div>
                          <div className="text-white font-medium">{post.author}</div>
                          <div className="text-gray-400 text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                        {post.isAnswered && <CheckCircle className="w-4 h-4 text-green-400" />}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-lg text-xs flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.replies}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'doubts' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-red-400" />
                    Doubt Clearing Zone
                  </h3>
                  <p className="text-gray-300 mb-4">Get your doubts resolved by experts and peers</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Quick Doubt</h4>
                      <p className="text-gray-400 text-sm">Get instant help with simple questions</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Detailed Discussion</h4>
                      <p className="text-gray-400 text-sm">Deep dive into complex topics</p>
                    </div>
                  </div>
                </div>
                
                {filteredPosts.filter(post => post.category === 'doubt').map((post) => (
                  <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div>
                          <div className="text-white font-medium">{post.author}</div>
                          <div className="text-gray-400 text-sm">{post.timestamp}</div>
                        </div>
                      </div>
                      {post.isAnswered ? (
                        <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolved
                        </div>
                      ) : (
                        <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                          Open
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{post.replies} answers</span>
                        <span>{post.likes} helpful</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                        Help Solve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-green-400" />
                    Study Groups
                  </h3>
                  <p className="text-gray-300 mb-4">Join study groups and learn together</p>
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
                    Create New Group
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {studyGroups.map((group) => (
                    <div key={group.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-white">{group.name}</h4>
                        <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      </div>
                      <p className="text-gray-300 mb-4">{group.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          {group.members} members
                        </div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {group.nextSession}
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                        Join Group
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faculty' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-yellow-400" />
                    Faculty Interaction Zone
                  </h3>
                  <p className="text-gray-300 mb-4">Direct interaction with expert faculty members</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">👨‍🏫</div>
                      <div className="text-white font-semibold">Dr. Rajesh Kumar</div>
                      <div className="text-gray-400 text-sm">Physics Expert</div>
                      <div className="text-green-400 text-xs mt-1">● Online</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">👩‍🏫</div>
                      <div className="text-white font-semibold">Dr. Priya Sharma</div>
                      <div className="text-gray-400 text-sm">Chemistry Expert</div>
                      <div className="text-gray-400 text-xs mt-1">● Away</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">👨‍💼</div>
                      <div className="text-white font-semibold">Prof. Amit Verma</div>
                      <div className="text-gray-400 text-sm">Math Expert</div>
                      <div className="text-green-400 text-xs mt-1">● Online</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-semibold text-white mb-4">Ask Faculty</h4>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Ask your question to faculty members..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="4"
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select Subject</option>
                          <option value="physics">Physics</option>
                          <option value="chemistry">Chemistry</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="biology">Biology</option>
                        </select>
                        <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Post</h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Post title..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Subject</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="biology">Biology</option>
                </select>
                
                <select className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Category</option>
                  <option value="doubt">Doubt</option>
                  <option value="discussion">Discussion</option>
                  <option value="study-group">Study Group</option>
                </select>
              </div>
              
              <textarea
                placeholder="Write your post content..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="6"
              ></textarea>
              
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setShowNewPostModal(false)}
                  className="px-6 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForums;