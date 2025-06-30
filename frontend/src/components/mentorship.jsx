import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Star, 
  BookOpen, 
  Target, 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Filter,
  Search,
  Play,
  User,
  GraduationCap,
  Medal,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const MentorshipProgram = () => {
  const [selectedExam, setSelectedExam] = useState('JEE');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const mentors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      qualification: "IIT Delhi, Ph.D. Physics",
      experience: "12 years",
      subjects: ["Physics", "Mathematics"],
      exams: ["JEE", "NEET"],
      rating: 4.9,
      reviews: 847,
      students: 2500,
      successRate: 94,
      image: "👨‍🏫",
      specialization: "Mechanics & Thermodynamics",
      achievements: ["AIR 12 JEE Advanced", "Published Researcher", "IIT Faculty"],
      hourlyRate: 2000,
      languages: ["Hindi", "English"],
      availability: "Mon-Fri 6-10 PM",
      bio: "Experienced IIT faculty with expertise in advanced physics concepts. Helped 2500+ students crack JEE with innovative teaching methods."
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      qualification: "AIIMS Delhi, MBBS, MD",
      experience: "8 years",
      subjects: ["Biology", "Chemistry"],
      exams: ["NEET"],
      rating: 4.8,
      reviews: 623,
      students: 1800,
      successRate: 96,
      image: "👩‍⚕️",
      specialization: "Human Physiology & Organic Chemistry",
      achievements: ["AIIMS Topper", "Medical Researcher", "NEET Expert"],
      hourlyRate: 1800,
      languages: ["Hindi", "English", "Tamil"],
      availability: "Tue-Sat 5-9 PM",
      bio: "AIIMS graduate with deep understanding of medical entrance patterns. Specializes in making complex biology concepts simple."
    },
    {
      id: 3,
      name: "Prof. Amit Gupta",
      qualification: "IIT Bombay, M.Tech CSE",
      experience: "15 years",
      subjects: ["Mathematics", "Physics"],
      exams: ["JEE"],
      rating: 4.9,
      reviews: 1205,
      students: 3200,
      successRate: 92,
      image: "🧑‍💼",
      specialization: "Advanced Mathematics & Problem Solving",
      achievements: ["IIT Bombay Topper", "JEE Advanced Expert", "Math Olympiad Coach"],
      hourlyRate: 2200,
      languages: ["Hindi", "English", "Marathi"],
      availability: "Daily 7-11 PM",
      bio: "15+ years of experience in coaching JEE Mathematics. Known for systematic approach to complex problem solving."
    },
    {
      id: 4,
      name: "Dr. Kavya Reddy",
      qualification: "NIT Warangal, Ph.D. Chemistry",
      experience: "10 years",
      subjects: ["Chemistry", "Biology"],
      exams: ["JEE", "NEET"],
      rating: 4.7,
      reviews: 542,
      students: 1600,
      successRate: 89,
      image: "👩‍🔬",
      specialization: "Organic Chemistry & Biochemistry",
      achievements: ["Chemistry Olympiad Winner", "Research Scientist", "CSIR-NET Qualified"],
      hourlyRate: 1900,
      languages: ["Telugu", "English", "Hindi"],
      availability: "Mon-Thu 6-10 PM",
      bio: "Chemistry expert with research background. Excellent at connecting theoretical concepts with practical applications."
    }
  ];

  const programs = [
    {
      title: "1-on-1 Mentorship",
      duration: "3 Months",
      sessions: 24,
      price: "₹15,999",
      features: [
        "Personalized study plan",
        "Weekly 1-hour sessions",
        "Doubt clearing support",
        "Progress tracking",
        "Mock test analysis"
      ]
    },
    {
      title: "Intensive Coaching",
      duration: "6 Months",
      sessions: 48,
      price: "₹28,999",
      features: [
        "Comprehensive syllabus coverage",
        "Bi-weekly sessions",
        "Personal mentor assignment",
        "Strategy development",
        "Performance analytics"
      ]
    },
    {
      title: "Complete Guidance",
      duration: "12 Months",
      sessions: 96,
      price: "₹49,999",
      features: [
        "Full exam preparation",
        "Regular mentorship calls",
        "Career counseling",
        "College selection guidance",
        "Interview preparation"
      ]
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = filterSubject === 'All' || mentor.subjects.includes(filterSubject);
    const matchesExam = mentor.exams.includes(selectedExam);
    
    return matchesSearch && matchesSubject && matchesExam;
  });

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 mb-8 border border-white/20">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Expert Mentorship Program</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Learn from the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Best</span>
              <br />Get Personal Guidance
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with IIT/NIT alumni and experienced faculty for personalized mentorship. 
              Get expert guidance, strategic planning, and continuous support throughout your preparation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl">
                Find Your Mentor
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Success Stories
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Expert Mentors" },
                { number: "95%", label: "Success Rate" },
                { number: "25K+", label: "Students Guided" },
                { number: "4.8", label: "Average Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Selection */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Mentorship Programs</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect mentorship program tailored to your needs and timeline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{program.title}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{program.price}</div>
                  <div className="text-gray-400">{program.duration} • {program.sessions} Sessions</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  Select Program
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Search & Filter */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Perfect Mentor</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse through our expert mentors and find the perfect match for your preparation needs
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Exam Filter */}
              <div className="flex bg-white/10 rounded-xl p-1">
                {['JEE', 'NEET'].map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedExam === exam
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject Filter */}
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject} className="bg-gray-800">
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mentor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                {/* Mentor Header */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{mentor.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{mentor.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{mentor.qualification}</p>
                  <p className="text-blue-400 font-medium">{mentor.specialization}</p>
                </div>

                {/* Rating & Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold ml-1">{mentor.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({mentor.reviews})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{mentor.hourlyRate}/hr</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{mentor.students}</div>
                    <div className="text-gray-400 text-xs">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{mentor.successRate}%</div>
                    <div className="text-gray-400 text-xs">Success Rate</div>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {mentor.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {mentor.availability}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-start space-x-6">
                  <div className="text-8xl">{selectedMentor.image}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedMentor.name}</h2>
                    <p className="text-gray-300 mb-2">{selectedMentor.qualification}</p>
                    <p className="text-blue-400 font-medium mb-4">{selectedMentor.specialization}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="text-white font-semibold">{selectedMentor.rating}</span>
                        <span className="text-gray-400 ml-1">({selectedMentor.reviews} reviews)</span>
                      </div>
                      <div className="text-white font-semibold">₹{selectedMentor.hourlyRate}/hour</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{selectedMentor.students}</div>
                  <div className="text-gray-400 text-sm">Students Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{selectedMentor.successRate}%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{selectedMentor.experience}</div>
                  <div className="text-gray-400 text-sm">Experience</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                <p className="text-gray-300 leading-relaxed">{selectedMentor.bio}</p>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedMentor.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <Award className="w-5 h-5 text-yellow-400 mr-3" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects & Languages */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.languages.map((language, idx) => (
                      <span key={idx} className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Availability</h3>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  {selectedMentor.availability}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Book Session
                </button>
                <button className="px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-md w-full border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Book Session</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Select Date</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Select Time</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" className="bg-gray-800">Choose time slot</option>
                    <option value="6:00 PM" className="bg-gray-800">6:00 PM - 7:00 PM</option>
                    <option value="7:00 PM" className="bg-gray-800">7:00 PM - 8:00 PM</option>
                    <option value="8:00 PM" className="bg-gray-800">8:00 PM - 9:00 PM</option>
                    <option value="9:00 PM" className="bg-gray-800">9:00 PM - 10:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Session Type</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="doubt-clearing" className="bg-gray-800">Doubt Clearing</option>
                    <option value="concept-building" className="bg-gray-800">Concept Building</option>
                    <option value="strategy-planning" className="bg-gray-800">Strategy Planning</option>
                    <option value="mock-test-analysis" className="bg-gray-800">Mock Test Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Additional Notes</label>
                  <textarea
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    placeholder="Any specific topics or questions you'd like to discuss..."
                  ></textarea>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Session Fee:</span>
                    <span className="text-white font-semibold text-lg">₹2,000</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Mentorship Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for comprehensive guidance and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Video className="w-8 h-8" />,
                title: "Live 1-on-1 Sessions",
                description: "Face-to-face interaction with expert mentors through HD video calls"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Personalized Study Plans",
                description: "Customized roadmap based on your strengths and target exam dates"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Progress Tracking",
                description: "Real-time monitoring of your performance and improvement areas"
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "24/7 Doubt Support",
                description: "Get your questions answered anytime via chat and voice messages"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
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

      {/* Success Stories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-xl text-gray-300">
              Real achievements from students who found their perfect mentors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Mehta",
                exam: "JEE Advanced",
                rank: "AIR 23",
                mentor: "Dr. Rajesh Kumar",
                story: "The personalized attention and strategic guidance helped me identify my weak areas and improve systematically. My mentor's experience was invaluable.",
                improvement: "+45 percentile",
                duration: "6 months"
              },
              {
                name: "Sneha Gupta",
                exam: "NEET",
                rank: "AIR 67",
                mentor: "Dr. Priya Sharma",
                story: "Dr. Sharma's approach to biology made complex concepts so clear. The regular mock test analysis sessions were game-changers for my preparation.",
                improvement: "+52 percentile",
                duration: "8 months"
              },
              {
                name: "Arjun Singh",
                exam: "JEE Main",
                rank: "99.2 percentile",
                mentor: "Prof. Amit Gupta",
                story: "The mathematical problem-solving techniques I learned from my mentor completely transformed my approach. Couldn't have done it without the guidance.",
                improvement: "+38 percentile",
                duration: "4 months"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                  <div className="text-blue-400 font-semibold">{story.exam} - {story.rank}</div>
                  <div className="text-gray-400 text-sm">Mentored by {story.mentor}</div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 italic leading-relaxed">"{story.story}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{story.improvement}</div>
                    <div className="text-gray-400 text-xs">Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{story.duration}</div>
                    <div className="text-gray-400 text-xs">Duration</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300">
              Simple steps to start your mentorship journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Mentor",
                description: "Browse through expert profiles and select the perfect mentor for your needs",
                icon: <Search className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Book a Session",
                description: "Schedule your first session at a convenient time and discuss your goals",
                icon: <Calendar className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Get Personalized Plan",
                description: "Receive a customized study plan and strategy tailored to your requirements",
                icon: <Target className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Track Progress",
                description: "Monitor your improvement with regular assessments and mentor feedback",
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(step.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about our mentorship program
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How are mentors selected and verified?",
                answer: "All our mentors go through a rigorous selection process. We verify their educational credentials, teaching experience, and conduct thorough interviews. Only top performers from IITs, NITs, AIIMS, and other premier institutions with proven track records are selected."
              },
              {
                question: "Can I change my mentor if needed?",
                answer: "Yes, absolutely! We understand that finding the right mentor-student fit is crucial. You can request a mentor change at any time, and we'll help you find a better match based on your preferences and learning style."
              },
              {
                question: "What if I miss a scheduled session?",
                answer: "We offer flexible rescheduling options. If you inform us at least 2 hours before the session, you can reschedule without any penalty. Emergency cancellations are also accommodated on a case-by-case basis."
              },
              {
                question: "How do you ensure session quality?",
                answer: "We monitor all sessions through student feedback, mentor evaluations, and periodic quality checks. Our mentors receive continuous training, and we maintain high standards through regular performance reviews."
              },
              {
                question: "Is there support available outside scheduled sessions?",
                answer: "Yes! All mentorship programs include doubt-clearing support via chat and voice messages. You can ask questions anytime, and your mentor will respond within 24 hours during working days."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Preparation?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dreams with expert mentorship. 
              Your perfect mentor is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl">
                Find Your Mentor Now
              </button>
              <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                Book Free Consultation
              </button>
            </div>
            
            <div className="mt-8 text-gray-400 text-sm">
              <p>🎯 Free trial session available • 💬 24/7 support • 🏆 Money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipProgram;