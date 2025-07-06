# ExamAce Frontend-Backend Integration Guide

## Overview

This guide explains how the frontend and backend are integrated in the ExamAce platform, providing a seamless user experience with authentication, real-time data, and API communication.

## Architecture

```
Frontend (React + Vite) ←→ Backend (Node.js + Express) ←→ Database (MongoDB)
     ↓                           ↓                           ↓
  Port 5173                  Port 8000                   MongoDB
```

## Key Integration Features

### 1. API Communication
- **Proxy Configuration**: Frontend proxies API requests to backend during development
- **RESTful API**: Standardized endpoints for all operations
- **Error Handling**: Centralized error management with user-friendly messages
- **Authentication**: JWT-based authentication with automatic token management

### 2. Authentication System
- **Login/Register**: Complete user authentication flow
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token storage and refresh
- **User Context**: Global user state management

### 3. Real-time Features
- **Dashboard**: Live user statistics and performance data
- **Test Results**: Real-time test submission and scoring
- **Analytics**: Performance tracking and progress monitoring

## File Structure

```
ExamAce-main/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx           # Authentication component
│   │   │   ├── Register.jsx        # User registration
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Authentication context
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── config/
│   │   │   └── config.js           # Configuration
│   │   └── App.jsx                 # Main app with routing
│   ├── vite.config.js              # Vite config with proxy
│   └── package.json                # Frontend dependencies
├── backend/
│   ├── server.js                   # Main server file
│   ├── routes/                     # API routes
│   ├── models/                     # Database models
│   └── package.json                # Backend dependencies
└── start-integrated.js             # Integrated startup script
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users/profile` - Get user profile

### Tests & Questions
- `GET /api/tests` - Get available tests
- `GET /api/tests/:id` - Get specific test
- `POST /api/test-results` - Submit test results
- `GET /api/test-results` - Get user's test results
- `GET /api/questions/:subject` - Get questions by subject

### Mentorship
- `GET /api/mentors` - Get available mentors
- `GET /api/mentors/:id` - Get specific mentor
- `POST /api/mentorship-sessions` - Book mentorship session

## Getting Started

### 1. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 2. Setup Database
```bash
# Setup backend database and seed data
npm run setup
```

### 3. Start Integrated Development
```bash
# Start both frontend and backend together
npm run dev:integrated
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/health

## Development Workflow

### Frontend Development
1. The frontend runs on Vite with hot reload
2. API requests are proxied to the backend during development
3. Authentication state is managed globally
4. Protected routes automatically redirect to login

### Backend Development
1. Backend runs with nodemon for auto-restart
2. MongoDB connection is established automatically
3. API endpoints are RESTful and well-documented
4. JWT authentication middleware protects routes

### Database Integration
1. MongoDB models are defined in `backend/models/`
2. Seed data is available for testing
3. User data, test results, and analytics are stored
4. Real-time updates through API calls

## Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=ExamAce
VITE_APP_VERSION=1.0.0
```

### Backend Configuration
The backend uses environment variables for:
- Database connection
- JWT secret
- Email configuration
- Server port

## Key Features

### 1. User Authentication
- Secure login/register forms
- Password strength validation
- JWT token management
- Automatic session handling

### 2. Dashboard Integration
- Real-time user statistics
- Performance analytics
- Recent activity tracking
- Quick action buttons

### 3. Test System
- Dynamic test loading
- Real-time test submission
- Score calculation
- Performance tracking

### 4. Mentorship System
- Mentor discovery
- Session booking
- Real-time communication
- Progress tracking

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check proxy settings in vite.config.js

2. **Authentication Issues**
   - Verify JWT secret in backend
   - Check token storage in localStorage
   - Ensure protected routes are wrapped

3. **Database Connection**
   - Verify MongoDB is running
   - Check connection string in backend
   - Run setup script if needed

4. **Port Conflicts**
   - Backend: 8000
   - Frontend: 5173
   - Check if ports are available

### Debug Mode
```bash
# Start with debug logging
DEBUG=* npm run dev:integrated
```

## Production Deployment

### Frontend Build
```bash
npm run build
```

### Backend Deployment
- Set production environment variables
- Use PM2 or similar process manager
- Configure reverse proxy (nginx)

### Database
- Use MongoDB Atlas or similar cloud service
- Configure connection pooling
- Set up backup and monitoring

## Security Considerations

1. **JWT Tokens**: Secure token storage and refresh
2. **API Security**: Input validation and sanitization
3. **CORS**: Proper cross-origin configuration
4. **Database**: Connection security and access control
5. **Environment Variables**: Secure configuration management

## Performance Optimization

1. **Frontend**: Code splitting and lazy loading
2. **Backend**: Database indexing and query optimization
3. **Caching**: Redis for session and data caching
4. **CDN**: Static asset delivery optimization

## Monitoring and Analytics

1. **Error Tracking**: Implement error monitoring
2. **Performance Monitoring**: Track API response times
3. **User Analytics**: Monitor user behavior and engagement
4. **Database Monitoring**: Track query performance

## Future Enhancements

1. **Real-time Features**: WebSocket integration
2. **File Upload**: Study material and profile images
3. **Push Notifications**: Browser and mobile notifications
4. **Advanced Analytics**: Machine learning insights
5. **Mobile App**: React Native integration

## Support

For integration issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console logs for errors
4. Verify environment configuration

---

This integration provides a solid foundation for the ExamAce platform with modern web technologies, secure authentication, and scalable architecture. 