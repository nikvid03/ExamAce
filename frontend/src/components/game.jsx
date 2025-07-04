import React, { useState, useEffect } from 'react';
import { Trophy, Target, Zap, BookOpen, Award, Star, Play, Clock, Users, TrendingUp } from 'lucide-react';

const GamifiedLearningPlatform = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Student",
    level: 12,
    xp: 2850,
    streak: 7,
    rank: 142,
    totalStudents: 50000
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = {
    physics: {
      name: "Physics",
      progress: 68,
      xp: 1200,
      chapters: 25,
      completed: 17,
      color: "from-blue-500 to-cyan-500",
      icon: "⚡"
    },
    chemistry: {
      name: "Chemistry",
      progress: 45,
      xp: 850,
      chapters: 22,
      completed: 10,
      color: "from-green-500 to-teal-500",
      icon: "🧪"
    },
    mathematics: {
      name: "Mathematics",
      progress: 72,
      xp: 1350,
      chapters: 18,
      completed: 13,
      color: "from-purple-500 to-pink-500",
      icon: "📐"
    },
    biology: {
      name: "Biology",
      progress: 55,
      xp: 980,
      chapters: 20,
      completed: 11,
      color: "from-orange-500 to-red-500",
      icon: "🧬"
    }
  };

  const achievements = [
    { title: "First Steps", description: "Complete your first chapter", earned: true },
    { title: "Speed Demon", description: "Solve 10 problems in under 5 minutes", earned: true },
    { title: "Streak Master", description: "Maintain 7-day study streak", earned: true },
    { title: "Physics Pro", description: "Score 90% in Physics test", earned: false },
    { title: "Top 100", description: "Reach top 100 in leaderboard", earned: false }
  ];

  const dailyChallenges = [
    { subject: "Physics", challenge: "Solve 5 mechanics problems", progress: 3, total: 5, xp: 50 },
    { subject: "Chemistry", challenge: "Complete organic chemistry quiz", progress: 0, total: 1, xp: 75 },
    { subject: "Math", challenge: "Practice integration for 30 minutes", progress: 15, total: 30, xp: 60 }
  ];

  const Dashboard = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="opacity-90">Level {currentUser.level} • {currentUser.xp} XP</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span>{currentUser.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Rank #{currentUser.rank}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-3/4"></div>
        </div>
        <p className="text-sm mt-2 opacity-90">Progress to Level {currentUser.level + 1}</p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(subjects).map(([key, subject]) => (
          <div key={key} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
               onClick={() => setSelectedSubject(key)}>
            <div className={`bg-gradient-to-r ${subject.color} rounded-lg p-4 mb-4`}>
              <div className="flex items-center justify-between text-white">
                <div>
                  <span className="text-2xl">{subject.icon}</span>
                  <h3 className="text-xl font-bold mt-2">{subject.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{subject.progress}%</div>
                  <div className="text-sm opacity-90">{subject.xp} XP</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{subject.completed}/{subject.chapters} chapters</span>
              <span className="flex items-center gap-1"><Play className="w-4 h-4" /> Continue</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Challenges */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-orange-500" />
          Daily Challenges
        </h3>
        <div className="space-y-3">
          {dailyChallenges.map((challenge, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-600">{challenge.subject}</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">+{challenge.xp} XP</span>
                </div>
                <p className="text-sm text-gray-700">{challenge.challenge}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 rounded-full h-2" 
                       style={{width: `${(challenge.progress / challenge.total) * 100}%`}}></div>
                </div>
              </div>
              <div className="text-sm text-gray-500 ml-4">
                {challenge.progress}/{challenge.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Leaderboard = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Top Performers This Week
      </h3>
      <div className="space-y-3">
        {[
          { name: "Priya Sharma", xp: 3250, rank: 1, avatar: "👩‍🎓" },
          { name: "Rohit Kumar", xp: 3100, rank: 2, avatar: "👨‍🎓" },
          { name: "Anita Singh", xp: 2980, rank: 3, avatar: "👩‍🎓" },
          { name: "You", xp: 2850, rank: 4, avatar: "🎯", isUser: true },
          { name: "Vikram Patel", xp: 2750, rank: 5, avatar: "👨‍🎓" }
        ].map((user, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${user.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-orange-500' : 'bg-blue-500'
              }`}>
                {user.rank}
              </div>
              <span className="text-lg">{user.avatar}</span>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.xp} XP</p>
              </div>
            </div>
            {user.rank <= 3 && (
              <Trophy className={`w-5 h-5 ${user.rank === 1 ? 'text-yellow-500' : user.rank === 2 ? 'text-gray-400' : 'text-orange-500'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Achievements = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Award className="w-6 h-6 text-purple-500" />
        Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-green-500' : 'bg-gray-400'}`}>
                {achievement.earned ? <Star className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-white opacity-50" />}
              </div>
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SubjectDetail = () => {
    const subject = subjects[selectedSubject];
    if (!subject) return null;

    const chapters = [
      { name: "Mechanics", completed: true, score: 85, time: "2h 30m" },
      { name: "Thermodynamics", completed: true, score: 92, time: "1h 45m" },
      { name: "Waves", completed: false, locked: false, time: "Est. 2h" },
      { name: "Optics", completed: false, locked: true, time: "Est. 1h 30m" }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setSelectedSubject(null)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">{subject.name}</h2>
        </div>

        <div className={`bg-gradient-to-r ${subject.color} rounded-xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-4xl">{subject.icon}</span>
              <h3 className="text-2xl font-bold mt-2">{subject.name}</h3>
              <p className="opacity-90">{subject.completed}/{subject.chapters} chapters completed</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{subject.progress}%</div>
              <div className="opacity-90">{subject.xp} XP earned</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Chapters</h3>
          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                chapter.completed ? 'bg-green-50 border-green-200 hover:bg-green-100' :
                chapter.locked ? 'bg-gray-50 border-gray-200 opacity-50' :
                'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      chapter.completed ? 'bg-green-500' :
                      chapter.locked ? 'bg-gray-400' : 'bg-blue-500'
                    }`}>
                      {chapter.completed ? '✓' : chapter.locked ? '🔒' : index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{chapter.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {chapter.time}
                        </span>
                        {chapter.completed && (
                          <span className="text-green-600 font-medium">Score: {chapter.score}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {!chapter.locked && (
                    <button className={`px-4 py-2 rounded-lg font-medium ${
                      chapter.completed ? 'bg-green-600 text-white hover:bg-green-700' :
                      'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {chapter.completed ? 'Review' : 'Start'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎮</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">StudyQuest</h1>
                <p className="text-gray-600">IIT JEE & NEET Preparation Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Daily Goal</p>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded-full h-2 w-20">
                    <div className="bg-green-500 rounded-full h-2 w-3/4"></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {!selectedSubject && (
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-lg">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {selectedSubject ? (
          <SubjectDetail />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'achievements' && <Achievements />}
          </>
        )}
      </div>
    </div>
  );
};

export default GamifiedLearningPlatform;