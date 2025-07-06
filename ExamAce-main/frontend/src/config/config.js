// Frontend Configuration
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ExamAce',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Feature flags
  FEATURES: {
    AI_POWERED: true,
    AR_VR: true,
    GAMIFICATION: true,
    MENTORSHIP: true,
    ANALYTICS: true,
  },
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/profile',
    },
    TESTS: {
      LIST: '/tests',
      DETAIL: '/tests/:id',
      RESULTS: '/test-results',
      SUBMIT: '/test-results',
    },
    QUESTIONS: {
      BY_SUBJECT: '/questions/:subject',
    },
    MENTORS: {
      LIST: '/mentors',
      DETAIL: '/mentors/:id',
      SESSIONS: '/mentorship-sessions',
    },
    HEALTH: '/health',
  },
  
  // UI Configuration
  UI: {
    THEME: {
      PRIMARY: '#3B82F6',
      SECONDARY: '#8B5CF6',
      SUCCESS: '#10B981',
      WARNING: '#F59E0B',
      ERROR: '#EF4444',
    },
    ANIMATIONS: {
      DURATION: 300,
      EASING: 'ease-in-out',
    },
  },
};

export default config; 