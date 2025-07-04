import React, { useState } from 'react';
import { CheckCircle, XCircle, BookOpen, ArrowLeft, Lightbulb, Star, Zap, Brain, Award, Sparkles } from 'lucide-react';

const QuestionSolutions = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [currentSolution, setCurrentSolution] = useState(0);

  const sampleQuestions = [
    {
      id: 1,
      question: "A particle moves in a straight line with constant acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?",
      options: [
        "2.5 m/s²",
        "5 m/s²",
        "7.5 m/s²",
        "10 m/s²"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4,
      difficulty: "Medium",
      explanation: "Using kinematic equations: s = ut + ½at². For first 10s: 100 = u(10) + ½a(100). For next 10s (total 20s): 250 = u(20) + ½a(400). Solving these equations: u = 7.5 m/s and a = 2.5 m/s².",
      keyPoints: ["Apply kinematic equations", "Set up two equations for different time intervals", "Solve simultaneously for acceleration"]
    },
    {
      id: 2,
      question: "Which of the following compounds will undergo nucleophilic substitution reaction most readily?",
      options: [
        "CH₃CH₂Cl",
        "CH₃CH₂Br",
        "CH₃CH₂I",
        "CH₃CH₂F"
      ],
      correctAnswer: 2,
      subject: "Chemistry",
      marks: 4,
      difficulty: "Easy",
      explanation: "Iodine is the best leaving group among halogens due to its large size and weak C-I bond. The order of reactivity for nucleophilic substitution is: I > Br > Cl > F.",
      keyPoints: ["Leaving group ability increases with size", "Weaker bonds break more easily", "Reactivity order: I > Br > Cl > F"]
    },
    {
      id: 3,
      question: "The derivative of ln(sin x) with respect to x is:",
      options: [
        "cos x",
        "cot x",
        "tan x",
        "sec x"
      ],
      correctAnswer: 1,
      subject: "Mathematics",
      marks: 4,
      difficulty: "Medium",
      explanation: "Using chain rule: d/dx[ln(sin x)] = (1/sin x) × d/dx(sin x) = (1/sin x) × cos x = cos x/sin x = cot x.",
      keyPoints: ["Apply chain rule", "Derivative of ln(u) is 1/u × du/dx", "Simplify to trigonometric form"]
    },
    {
      id: 4,
      question: "Two resistors of 4Ω and 6Ω are connected in parallel. What is the equivalent resistance?",
      options: [
        "2.4 Ω",
        "5 Ω",
        "10 Ω",
        "24 Ω"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4,
      difficulty: "Easy",
      explanation: "For parallel resistors: 1/Req = 1/R₁ + 1/R₂ = 1/4 + 1/6 = 3/12 + 2/12 = 5/12. Therefore, Req = 12/5 = 2.4 Ω.",
      keyPoints: ["Use parallel resistance formula", "Add reciprocals of individual resistances", "Take reciprocal of sum"]
    },
    {
      id: 5,
      question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-COOH is:",
      options: [
        "3-methylbutanoic acid",
        "2-methylbutanoic acid",
        "3-methylpropanoic acid",
        "2-methylpropanoic acid"
      ],
      correctAnswer: 0,
      subject: "Chemistry",
      marks: 4,
      difficulty: "Medium",
      explanation: "The longest carbon chain has 4 carbons (butanoic acid). The methyl group is attached to the 3rd carbon when counting from the carboxyl group. Hence, 3-methylbutanoic acid.",
      keyPoints: ["Find longest carbon chain", "Number from carboxyl group", "Name substituents with position"]
    },
    {
      id: 6,
      question: "If f(x) = x³ - 6x² + 9x + 1, then f'(x) = 0 at x =",
      options: [
        "x = 1, 3",
        "x = 2, 4",
        "x = 0, 3",
        "x = 1, 2"
      ],
      correctAnswer: 0,
      subject: "Mathematics",
      marks: 4,
      difficulty: "Easy",
      explanation: "f'(x) = 3x² - 12x + 9. Setting f'(x) = 0: 3x² - 12x + 9 = 0, or x² - 4x + 3 = 0. Factoring: (x-1)(x-3) = 0. Therefore, x = 1 and x = 3.",
      keyPoints: ["Find derivative using power rule", "Set derivative equal to zero", "Factor quadratic equation"]
    },
    {
      id: 7,
      question: "A block of mass 2 kg is placed on a rough inclined plane of angle 30°. If coefficient of friction is 0.5, the acceleration down the plane is: (g = 10 m/s²)",
      options: [
        "0.67 m/s²",
        "1.33 m/s²",
        "2.5 m/s²",
        "5 m/s²"
      ],
      correctAnswer: 1,
      subject: "Physics",
      marks: 4,
      difficulty: "Hard",
      explanation: "Forces: mg sin 30° (down the plane) = 2×10×0.5 = 10 N. Friction force = μN = μmg cos 30° = 0.5×2×10×(√3/2) = 8.66 N. Net force = 10 - 8.66 = 1.34 N. Acceleration = F/m = 1.34/2 ≈ 1.33 m/s².",
      keyPoints: ["Resolve weight into components", "Calculate friction force", "Apply Newton's second law"]
    },
    {
      id: 8,
      question: "Which of the following has the highest bond dissociation energy?",
      options: [
        "H-H",
        "F-F",
        "Cl-Cl",
        "Br-Br"
      ],
      correctAnswer: 0,
      subject: "Chemistry",
      marks: 4,
      difficulty: "Easy",
      explanation: "H-H bond has the highest bond dissociation energy (436 kJ/mol) due to the small size of hydrogen atoms and strong orbital overlap. The order is: H-H > F-F > Cl-Cl > Br-Br.",
      keyPoints: ["Smaller atoms form stronger bonds", "Better orbital overlap increases bond strength", "H-H has maximum overlap efficiency"]
    },
    {
      id: 9,
      question: "The integral ∫(1/x)dx equals:",
      options: [
        "ln|x| + C",
        "1/x² + C",
        "x²/2 + C",
        "-1/x + C"
      ],
      correctAnswer: 0,
      subject: "Mathematics",
      marks: 4,
      difficulty: "Easy",
      explanation: "The integral of 1/x is ln|x| + C. This is a standard integral formula. The absolute value ensures the result is defined for negative values of x.",
      keyPoints: ["Standard integral formula", "Use absolute value for domain", "Don't forget constant of integration"]
    },
    {
      id: 10,
      question: "A convex lens of focal length 20 cm forms a real image at a distance of 60 cm from the lens. The object distance is:",
      options: [
        "30 cm",
        "15 cm",
        "12 cm",
        "40 cm"
      ],
      correctAnswer: 0,
      subject: "Physics",
      marks: 4,
      difficulty: "Medium",
      explanation: "Using lens formula: 1/f = 1/u + 1/v. Given f = 20 cm, v = 60 cm. So, 1/20 = 1/u + 1/60. Solving: 1/u = 1/20 - 1/60 = 3/60 - 1/60 = 2/60 = 1/30. Therefore, u = 30 cm.",
      keyPoints: ["Apply lens formula", "Substitute known values", "Solve for unknown object distance"]
    }
  ];

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'Physics': return 'from-blue-500 to-cyan-600';
      case 'Chemistry': return 'from-green-500 to-emerald-600';
      case 'Mathematics': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getSubjectIcon = (subject) => {
    switch (subject) {
      case 'Physics': return <Zap className="w-5 h-5" />;
      case 'Chemistry': return <Brain className="w-5 h-5" />;
      case 'Mathematics': return <Star className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'from-green-400 to-green-600';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!showSolutions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="relative">
          {/* Floating elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 -right-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-500"></div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-white/20">
            <div className="text-center">
              {/* Animated icon */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-20"></div>
                <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                Unlock Solutions
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Discover detailed step-by-step solutions with expert explanations for all 10 practice questions. Master concepts with our interactive learning experience!
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-500">Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">40</div>
                  <div className="text-xs text-gray-500">Total Marks</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSolutions(true)}
                className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <Lightbulb className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Get Solutions Now</span>
                  <Award className="w-6 h-6 group-hover:animate-bounce delay-100" />
                </div>
              </button>
              
              <p className="text-xs text-gray-400 mt-4 flex items-center justify-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Instant access • No signup required</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Header */}
      <div className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowSolutions(false)}
                className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-200 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Expert Solutions
                </h1>
                <p className="text-sm text-gray-600">Master every concept with detailed explanations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">{sampleQuestions.length} Solutions</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{currentSolution + 1} of {sampleQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentSolution + 1) / sampleQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {sampleQuestions.map((question, index) => (
            <div 
              key={question.id} 
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:scale-[1.02]"
              onMouseEnter={() => setCurrentSolution(index)}
            >
              <div className="p-8">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${getSubjectColor(question.subject)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2`}>
                        {getSubjectIcon(question.subject)}
                        <span>{question.subject}</span>
                      </div>
                      <div className={`bg-gradient-to-r ${getDifficultyColor(question.difficulty)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-md`}>
                        {question.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                      {question.marks} marks
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-relaxed">
                    {question.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`relative flex items-center p-4 border-2 rounded-xl transition-all duration-300 ${
                        optionIndex === question.correctAnswer
                          ? 'border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          optionIndex === question.correctAnswer
                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + optionIndex)}
                        </div>
                        <span className={`flex-1 ${
                          optionIndex === question.correctAnswer ? 'text-emerald-800 font-semibold' : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                        {optionIndex === question.correctAnswer && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                            <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                              CORRECT
                            </span>
                          </div>
                        )}
                      </div>
                      {optionIndex === question.correctAnswer && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Solution Section */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-6 shadow-inner">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-3 flex items-center space-x-2">
                        <span>Complete Solution</span>
                        <Sparkles className="w-5 h-5 text-purple-500" />
                      </h4>
                      <p className="text-blue-900 leading-relaxed mb-4 text-base">{question.explanation}</p>
                      
                      {/* Key Points */}
                      <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
                        <h5 className="font-semibold text-purple-700 mb-3 flex items-center space-x-2">
                          <Brain className="w-4 h-4" />
                          <span>Key Learning Points</span>
                        </h5>
                        <ul className="space-y-2">
                          {question.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-center space-x-3 text-sm text-purple-800">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-6">You've completed all solutions. Keep practicing to master these concepts!</p>
            <button
              onClick={() => setShowSolutions(false)}
              className="bg-gradient-to-r from-gray-600 to-slate-700 text-white px-8 py-3 rounded-xl hover:from-gray-700 hover:to-slate-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Back to Questions
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="fixed top-20 right-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75 pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 pointer-events-none delay-1000"></div>
      <div className="fixed top-1/2 right-20 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-75 pointer-events-none delay-500"></div>
    </div>
  );
};

export default QuestionSolutions;