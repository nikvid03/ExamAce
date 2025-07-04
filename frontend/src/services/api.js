// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('examace_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Start free trial
  async startFreeTrial(formData) {
    const response = await fetch(`${this.baseURL}/free-trial`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(formData)
    });
    
    return this.handleResponse(response);
  }

  // Login user
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials)
    });
    
    return this.handleResponse(response);
  }

  // Get user profile
  async getUserProfile() {
    const response = await fetch(`${this.baseURL}/user/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Get all users (admin)
  async getAllUsers() {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Store user data locally
  storeUserData(userData) {
    localStorage.setItem('examace_user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('examace_token', userData.token);
    }
  }

  // Get stored user data
  getStoredUserData() {
    const userData = localStorage.getItem('examace_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Clear stored user data
  clearUserData() {
    localStorage.removeItem('examace_user');
    localStorage.removeItem('examace_token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('examace_token');
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('examace_token');
  }
}

export default new APIService();