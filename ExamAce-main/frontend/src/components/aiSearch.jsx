import React, { useState, useEffect } from 'react';
import { Search, Brain, Microscope, Atom, Dna, Telescope, Calculator, Beaker, Zap, Lightbulb, BookOpen, Clock } from 'lucide-react';

const ScienceAISearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const categories = [
    { id: 'all', name: 'All Sciences', icon: Brain },
    { id: 'physics', name: 'Physics', icon: Atom },
    { id: 'chemistry', name: 'Chemistry', icon: Beaker },
    { id: 'biology', name: 'Biology', icon: Dna },
    { id: 'astronomy', name: 'Astronomy', icon: Telescope },
    { id: 'mathematics', name: 'Mathematics', icon: Calculator },
    { id: 'engineering', name: 'Engineering', icon: Zap }
  ];

  // Simulated AI responses for different science topics
  const aiResponses = {
    "photosynthesis": {
      category: "biology",
      title: "Photosynthesis Process",
      answer: "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in two main stages: light-dependent reactions (in thylakoids) and light-independent reactions (Calvin cycle in stroma). The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.",
      confidence: 95,
      sources: ["Campbell Biology", "Khan Academy", "Nature Education"]
    },
    "quantum mechanics": {
      category: "physics",
      title: "Quantum Mechanics Fundamentals",
      answer: "Quantum mechanics describes the behavior of matter and energy at atomic and subatomic scales. Key principles include wave-particle duality, uncertainty principle, and quantum superposition. Unlike classical physics, quantum systems exist in probabilistic states until measured.",
      confidence: 92,
      sources: ["Griffiths Introduction to Quantum Mechanics", "MIT OpenCourseWare", "Physical Review"]
    },
    "DNA replication": {
      category: "biology",
      title: "DNA Replication Process",
      answer: "DNA replication is semiconservative, occurring during S phase. Key enzymes include helicase (unwinds DNA), DNA polymerase (synthesizes new strands), and ligase (joins fragments). The leading strand is synthesized continuously, while the lagging strand forms Okazaki fragments.",
      confidence: 96,
      sources: ["Molecular Biology of the Cell", "Nature Reviews", "Cell Biology Textbook"]
    },
    "chemical bonding": {
      category: "chemistry",
      title: "Chemical Bonding Types",
      answer: "Chemical bonds form through electron interactions. Ionic bonds involve electron transfer between metals and nonmetals. Covalent bonds share electrons between nonmetals. Metallic bonding involves delocalized electrons in metal lattices. Bond strength affects molecular properties.",
      confidence: 94,
      sources: ["Atkins Physical Chemistry", "Journal of Chemical Education", "Chemistry LibreTexts"]
    },
    "black holes": {
      category: "astronomy",
      title: "Black Hole Physics",
      answer: "Black holes are regions where gravity is so strong that nothing, including light, can escape. They form from collapsed massive stars. Key features include the event horizon, singularity, and Hawking radiation. Einstein's general relativity predicts their existence.",
      confidence: 91,
      sources: ["Astrophysical Journal", "NASA Educational Resources", "Hawking's 'A Brief History of Time'"]
    }
  };

  const getAIResponse = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
        return response;
      }
    }
    
    // Generate generic response based on category
    return {
      category: category === 'all' ? 'general' : category,
      title: `AI Analysis: ${searchQuery}`,
      answer: `Based on current scientific understanding, "${searchQuery}" involves complex interactions of fundamental principles. This topic requires consideration of multiple variables and current research findings. The AI system recommends consulting peer-reviewed sources and expert analysis for comprehensive understanding.`,
      confidence: 78,
      sources: ["Scientific Literature Database", "Peer Review Network", "Research Publications"]
    };
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse = getAIResponse(query);
    const timestamp = new Date().toLocaleTimeString();
    
    const searchResult = {
      id: Date.now(),
      query,
      category,
      timestamp,
      ...aiResponse
    };
    
    setResults([searchResult, ...results.slice(0, 4)]);
    setSearchHistory([{ query, category, timestamp }, ...searchHistory.slice(0, 9)]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ScienceAI Search
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant AI-powered answers to your science questions across all major scientific disciplines
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Science Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        category === cat.id
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask any science question... (e.g., 'How does photosynthesis work?')"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-5 h-5" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              AI Responses
            </h2>
            
            {results.length === 0 && !isLoading && (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                <Microscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Explore Science</h3>
                <p className="text-gray-500">Enter your science question above to get AI-powered insights and explanations.</p>
              </div>
            )}

            <div className="space-y-6">
              {results.map(result => (
                <div key={result.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{result.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {result.timestamp}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {result.category}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {result.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{result.answer}</p>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Sources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.sources.map((source, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search History Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Recent Searches
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {searchHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent searches</p>
              ) : (
                <div className="space-y-3">
                  {searchHistory.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <p className="font-medium text-gray-800 text-sm mb-1">{item.query}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 font-medium">{item.category}</span>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Examples */}
            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Try These Examples:</h3>
              <div className="space-y-2">
                {[
                  "How does photosynthesis work?",
                  "What is quantum mechanics?",
                  "Explain DNA replication",
                  "Types of chemical bonding",
                  "What are black holes?"
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(example)}
                    className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceAISearch;