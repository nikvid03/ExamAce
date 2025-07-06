import config from '../config/config.js';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Helper method to set auth token
  setAuthToken(token) {
    localStorage.setItem('token', token);
  }

  // Helper method to remove auth token
  removeAuthToken() {
    localStorage.removeItem('token');
  }

  // Helper method to get headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.getHeaders(),
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.removeAuthToken();
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    this.removeAuthToken();
  }

  // User endpoints
  async getCurrentUser() {
    return this.request('/users/profile');
  }

  async updateProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Questions endpoints
  async getQuestions(subject, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/questions/${subject}?${queryParams}`);
  }

  // Tests endpoints
  async getTests(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/tests?${queryParams}`);
  }

  async getTestById(testId) {
    return this.request(`/tests/${testId}`);
  }

  async submitTestResult(testResult) {
    return this.request('/test-results', {
      method: 'POST',
      body: JSON.stringify(testResult),
    });
  }

  async getTestResults() {
    return this.request('/test-results');
  }

  // Mentors endpoints
  async getMentors(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/mentors?${queryParams}`);
  }

  async getMentorById(mentorId) {
    return this.request(`/mentors/${mentorId}`);
  }

  async bookMentorshipSession(sessionData) {
    return this.request('/mentorship-sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 