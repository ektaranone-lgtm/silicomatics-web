# System Architecture

## Overview

This document describes the architecture of the SilicoInformatics full-stack application.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Vue.js Frontend (Port 5173)                  │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │ SignupView   │  │  LoginView   │  │   HomeView   │  │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │  │
│  │         │                  │                              │  │
│  │         └──────────┬───────┘                              │  │
│  │                    │                                       │  │
│  │         ┌──────────▼───────────┐                          │  │
│  │         │   API Service        │                          │  │
│  │         │   (api.ts)           │                          │  │
│  │         │                      │                          │  │
│  │         │ - signup()           │                          │  │
│  │         │ - login()            │                          │  │
│  │         │ - getCurrentUser()   │                          │  │
│  │         │ - Token Management   │                          │  │
│  │         └──────────┬───────────┘                          │  │
│  │                    │                                       │  │
│  └────────────────────┼───────────────────────────────────────┘  │
│                       │ HTTP/HTTPS                               │
│                       │ (JSON)                                   │
└───────────────────────┼──────────────────────────────────────────┘
                        │
                        │ CORS Protected
                        │ JWT Token in Headers
                        │
┌───────────────────────▼──────────────────────────────────────────┐
│                        SERVER SIDE                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Express.js Backend (Port 5000)                  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │              Middleware Stack                       │  │  │
│  │  │                                                      │  │  │
│  │  │  • Helmet (Security Headers)                        │  │  │
│  │  │  • CORS (Cross-Origin Protection)                   │  │  │
│  │  │  • Rate Limiter (DDoS Protection)                   │  │  │
│  │  │  • Body Parser (JSON/URL-encoded)                   │  │  │
│  │  │  • JWT Authentication (protect middleware)          │  │  │
│  │  │  • Input Validation (express-validator)             │  │  │
│  │  └────────────────┬───────────────────────────────────┘  │  │
│  │                   │                                       │  │
│  │  ┌────────────────▼───────────────────────────────────┐  │  │
│  │  │              Route Handlers                         │  │  │
│  │  │                                                      │  │  │
│  │  │  POST /api/auth/signup                              │  │  │
│  │  │  POST /api/auth/login                               │  │  │
│  │  │  GET  /api/auth/me  [Protected]                     │  │  │
│  │  │  GET  /api/health                                   │  │  │
│  │  └────────────────┬───────────────────────────────────┘  │  │
│  │                   │                                       │  │
│  │  ┌────────────────▼───────────────────────────────────┐  │  │
│  │  │            Controllers                              │  │  │
│  │  │                                                      │  │  │
│  │  │  • signup()        - User registration              │  │  │
│  │  │  • login()         - User authentication            │  │  │
│  │  │  • getMe()         - Get current user               │  │  │
│  │  │  • generateToken() - JWT creation                   │  │  │
│  │  └────────────────┬───────────────────────────────────┘  │  │
│  │                   │                                       │  │
│  │  ┌────────────────▼───────────────────────────────────┐  │  │
│  │  │            Mongoose Models                          │  │  │
│  │  │                                                      │  │  │
│  │  │  User Model:                                        │  │  │
│  │  │    - Schema definition                              │  │  │
│  │  │    - Field validation                               │  │  │
│  │  │    - Password hashing (pre-save hook)              │  │  │
│  │  │    - comparePassword() method                       │  │  │
│  │  └────────────────┬───────────────────────────────────┘  │  │
│  │                   │                                       │  │
│  └───────────────────┼───────────────────────────────────────┘  │
│                      │ Mongoose ODM                             │
└──────────────────────┼──────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                      DATABASE                                    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           MongoDB (Port 27017)                            │  │
│  │                                                            │  │
│  │  Database: silicomatics                                   │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Collection: users                                   │ │  │
│  │  │                                                       │ │  │
│  │  │  Documents:                                          │ │  │
│  │  │  {                                                   │ │  │
│  │  │    _id: ObjectId,                                    │ │  │
│  │  │    firstName: String,                                │ │  │
│  │  │    lastName: String,                                 │ │  │
│  │  │    email: String (unique, indexed),                  │ │  │
│  │  │    company: String,                                  │ │  │
│  │  │    industry: String,                                 │ │  │
│  │  │    password: String (bcrypt hashed),                 │ │  │
│  │  │    agreedToTerms: Boolean,                           │ │  │
│  │  │    createdAt: Date,                                  │ │  │
│  │  │    updatedAt: Date                                   │ │  │
│  │  │  }                                                   │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

## Request Flow

### Signup Flow

```
1. User fills signup form → SignupView.vue
2. Form validation on client side
3. API call → apiService.signup(userData)
4. HTTP POST → /api/auth/signup
5. Middleware stack processes request:
   - Helmet adds security headers
   - CORS validates origin
   - Rate limiter checks request count
   - Body parser extracts JSON
   - Express-validator validates input
6. Controller → signup()
   - Checks if email exists in MongoDB
   - Creates new User document
   - Password automatically hashed (Mongoose pre-save hook)
7. User saved to MongoDB
8. JWT token generated and signed
9. Response sent back:
   {
     success: true,
     token: "jwt_token_here",
     user: { ...userData }
   }
10. Frontend stores token in localStorage
11. Redirect user to login/home page
```

### Login Flow

```
1. User enters credentials → LoginView.vue
2. API call → apiService.login(credentials)
3. HTTP POST → /api/auth/login
4. Middleware stack processes request
5. Controller → login()
   - Finds user by email
   - Compares password using bcrypt
   - Generates JWT token if valid
6. Response with token and user data
7. Frontend stores token in localStorage
8. Redirect to home page
```

### Protected Route Flow

```
1. User requests protected resource
2. API call includes token in Authorization header
3. HTTP GET → /api/auth/me
4. Middleware → protect()
   - Extracts token from header
   - Verifies JWT signature
   - Decodes user ID from token
   - Attaches user to request object
5. Controller → getMe()
   - Fetches user from MongoDB
   - Returns user data
6. Response sent to frontend
```

## Security Layers

### Layer 1: Frontend Validation
- Input format validation
- Password strength checking
- Confirm password matching
- Required field validation

### Layer 2: Network Security
- CORS protection (only allows requests from frontend URL)
- Rate limiting (prevents brute force attacks)
- Helmet headers (XSS, clickjacking protection)

### Layer 3: API Validation
- Express-validator sanitizes and validates inputs
- Email format validation
- Password length enforcement
- Required field checks
- Type validation

### Layer 4: Authentication
- JWT token-based authentication
- Tokens expire after configured time (7 days default)
- Secure token storage in localStorage
- Token sent in Authorization header

### Layer 5: Data Security
- Passwords hashed with bcrypt (10 salt rounds)
- Sensitive data never logged or exposed
- User passwords excluded from queries by default
- Environment variables for secrets

### Layer 6: Database Security
- Mongoose schema validation
- Unique constraints on email
- Data type enforcement
- Timestamps for audit trail

## Technology Stack

### Frontend Stack
```
Vue.js 3
  └── Composition API
  └── TypeScript
  └── Vue Router
      └── Route Guards (can be added)
  └── Vite (Build Tool)
      └── Fast HMR
      └── Optimized builds
```

### Backend Stack
```
Node.js
  └── Express.js
      ├── Middleware
      │   ├── helmet (Security)
      │   ├── cors (CORS)
      │   ├── express-rate-limit (Rate limiting)
      │   ├── body-parser (JSON parsing)
      │   └── Custom middleware (auth, validation)
      │
      ├── Routes
      │   └── /api/auth/*
      │
      └── Controllers
          └── Business Logic
  
  └── Mongoose (ODM)
      ├── Schema definitions
      ├── Validation
      ├── Middleware (hooks)
      └── Methods
  
  └── Security Libraries
      ├── jsonwebtoken (JWT)
      ├── bcryptjs (Password hashing)
      └── express-validator (Input validation)
```

### Database
```
MongoDB
  └── Document-based NoSQL
  └── Flexible schema
  └── High performance
  └── Horizontal scaling
  └── Indexes on email field
```

## Data Models

### User Model Schema

```typescript
{
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  industry: {
    type: String,
    required: true,
    enum: ['pharmaceutical', 'agriculture', 'biotechnology', 'healthcare', 'other']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false  // Never return in queries
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
    validate: value === true
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_here" (if applicable)
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] (if validation errors)
}
```

## Environment Configuration

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: mongodb://localhost:27017/silicomatics
- CORS: Allows localhost:5173
- JWT Expiry: 7 days
- Rate Limit: 100 requests per 15 minutes

### Production (Recommended)
- Frontend: https://yourdomain.com
- Backend: https://api.yourdomain.com
- Database: MongoDB Atlas cluster
- CORS: Specific domain only
- JWT Expiry: 24 hours (shorter)
- Rate Limit: 50 requests per 15 minutes (stricter)
- HTTPS enforced
- Environment variables in secure vault

## Scalability Considerations

### Horizontal Scaling
- Backend: Stateless design allows multiple instances
- Load balancer can distribute requests
- JWT tokens allow authentication across instances

### Database Scaling
- MongoDB supports sharding for large datasets
- Replica sets for high availability
- Indexes on frequently queried fields (email)

### Caching (Future Enhancement)
- Redis for session management
- Cache frequently accessed user data
- Reduce database load

### Monitoring (Future Enhancement)
- Application logs
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Database query analytics

## Future Enhancements

1. **Email Verification**
   - Send verification email on signup
   - Verify email before account activation

2. **Password Reset**
   - Forgot password functionality
   - Email with reset link
   - Secure token-based reset

3. **Refresh Tokens**
   - Long-lived refresh tokens
   - Short-lived access tokens
   - Automatic token renewal

4. **User Roles & Permissions**
   - Admin, user, guest roles
   - Role-based access control
   - Permission middleware

5. **Profile Management**
   - Update user profile
   - Change password
   - Upload profile picture

6. **Two-Factor Authentication**
   - SMS or app-based 2FA
   - Backup codes
   - Enhanced security

7. **Activity Logs**
   - Track user login history
   - Security event logging
   - Audit trail

8. **Social Authentication**
   - Google OAuth
   - GitHub OAuth
   - LinkedIn OAuth

## Conclusion

This architecture provides:
- ✅ Secure authentication and authorization
- ✅ Scalable design
- ✅ Maintainable codebase
- ✅ Modern tech stack
- ✅ Production-ready foundation
- ✅ Room for growth and enhancements
