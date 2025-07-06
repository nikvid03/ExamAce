import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    examType: 'JEE',
    targetYear: new Date().getFullYear() + 1,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const examTypes = [
    { value: 'JEE', label: 'JEE Main & Advanced' },
    { value: 'NEET', label: 'NEET' },
    { value: 'GATE', label: 'GATE' },
    { value: 'CAT', label: 'CAT' },
    { value: 'UPSC', label: 'UPSC' },
  ];

  const targetYears = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
  ];

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) score++;
    else feedback.push('Number');

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Special character');

    return {
      score,
      feedback: feedback.length > 0 ? feedback.join(', ') : 'Strong password',
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please make it stronger.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'text-red-400';
    if (passwordStrength.score <= 3) return 'text-yellow-400';
    if (passwordStrength.score <= 4) return 'text-blue-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">EA</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-gray-300">Join ExamAce and start your success journey</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="examType" className="block text-sm font-medium text-gray-300 mb-2">
                  Exam Type
                </label>
                <select
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                  className="block w-full py-3 px-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {examTypes.map((exam) => (
                    <option key={exam.value} value={exam.value}>
                      {exam.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="targetYear" className="block text-sm font-medium text-gray-300 mb-2">
                  Target Year
                </label>
                <select
                  id="targetYear"
                  name="targetYear"
                  value={formData.targetYear}
                  onChange={handleChange}
                  className="block w-full py-3 px-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {targetYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`text-xs ${getPasswordStrengthColor()}`}>
                    {passwordStrength.feedback}
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 w-4 rounded ${
                          level <= passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? 'bg-red-400'
                              : passwordStrength.score <= 3
                              ? 'bg-yellow-400'
                              : passwordStrength.score <= 4
                              ? 'bg-blue-400'
                              : 'bg-green-400'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-red-400">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 