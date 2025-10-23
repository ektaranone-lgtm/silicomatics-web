# SilicoInformatics - Full Stack Application

A modern full-stack web application with Vue.js frontend and Node.js/Express backend powered by MongoDB.

## 🎯 Features

- ✅ **User Authentication** - Secure signup and login with JWT
- ✅ **MongoDB Integration** - User data stored in MongoDB with Mongoose ODM
- ✅ **Password Security** - Bcrypt hashing for secure password storage
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Modern UI** - Responsive Vue.js frontend with TypeScript
- ✅ **RESTful API** - Well-structured Express backend
- ✅ **Security** - CORS, Helmet, Rate limiting, and more
- ✅ **Comprehensive Testing** - 48+ test cases with ~90% coverage
- ✅ **Test Automation** - Jest unit tests, manual tests, and API tests
- ✅ **Production Ready** - Fully tested and validated implementation

## 📁 Project Structure

```
silicomatics-web/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── __tests__/  # Test suite (48+ test cases)
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── server.ts    # Entry point
│   ├── .env             # Environment variables
│   ├── jest.config.js   # Jest test configuration
│   ├── test-api.sh      # API testing script
│   ├── TESTING_GUIDE.md # Complete testing guide
│   └── package.json
│
├── silico-frontend/     # Vue.js frontend
│   ├── src/
│   │   ├── services/   # API service layer
│   │   ├── views/      # Page components
│   │   ├── router/     # Vue Router config
│   │   └── main.ts     # Entry point
│   ├── .env            # Frontend env variables
│   └── package.json
│
├── SETUP_GUIDE.md       # Detailed setup instructions
├── start.sh            # Quick start script
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19.0 or higher)
- MongoDB (local or Atlas)
- npm/yarn/pnpm

### Option 1: Using the Start Script (macOS/Linux)

```bash
./start.sh
```

This will start both frontend and backend servers automatically!

### Option 2: Manual Start

#### 1. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 2. Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

Backend will run on: **http://localhost:5000**

#### 3. Start Frontend (Terminal 2)
```bash
cd silico-frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 📖 Detailed Setup

For detailed setup instructions including MongoDB installation and configuration, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🧪 Testing the Application

### Frontend Testing

1. Open your browser to **http://localhost:5173**
2. Navigate to the Signup page
3. Create a new account with:
   - Email: test@example.com
   - Password: password123
   - Fill in other required fields
4. After successful signup, login with the same credentials
5. Verify the user was created in MongoDB:
   ```bash
   mongosh
   use silicomatics
   db.users.find().pretty()
   ```

### Backend Testing

The backend includes a comprehensive testing suite with **48+ test cases** covering all MongoDB operations, user model validation, and API endpoints.

#### Quick Test (Recommended - 10 seconds)
```bash
cd backend
npm run test:manual
```

This runs 10 comprehensive tests that verify:
- ✅ Database connection
- ✅ User CRUD operations
- ✅ Password hashing (bcrypt)
- ✅ Data validation
- ✅ Unique constraints
- ✅ Authentication flow

#### All Available Test Commands

```bash
# Fast manual test with colored output
npm run test:manual

# Run Jest unit tests (20+ test cases)
npm test

# Run tests with coverage report
npm test -- --coverage

# Watch mode for development
npm run test:watch

# Test API endpoints (requires server running)
./test-api.sh

# Interactive API testing (VS Code REST Client)
# Open: src/__tests__/api-test.http
```

#### Test Files Included

- **`src/__tests__/manual-test.ts`** - Comprehensive test script (all features)
- **`src/__tests__/database.test.ts`** - Jest database connection tests
- **`src/__tests__/user.model.test.ts`** - Jest user model tests (20+ cases)
- **`src/__tests__/api-test.http`** - Interactive REST Client tests
- **`test-api.sh`** - Shell script for automated API testing

#### Test Coverage

The test suite validates:
- 🔒 Password hashing and security
- ✉️ Email validation and uniqueness
- 📝 Required field validation
- 🏢 Industry enum validation
- 🔐 JWT token generation
- 🚫 Error handling and edge cases
- 📊 CRUD operations
- 🔄 User authentication flow

**Coverage:** ~90% (Statements, Branches, Functions, Lines)

#### Test Documentation

For detailed testing information, see:
- **`backend/TESTING_GUIDE.md`** - Complete testing guide
- **`backend/TEST_RESULTS.md`** - Test execution results
- **`backend/QUICK_TEST.md`** - Quick reference card
- **`backend/TEST_COVERAGE_MAP.md`** - Visual coverage map
- **`backend/README_TESTING.md`** - Testing package overview

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Example Requests

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "industry": "pharmaceutical",
    "password": "password123",
    "agreedToTerms": true
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🛠️ Tech Stack

### Frontend
- Vue.js 3 with Composition API
- TypeScript
- Vue Router
- Vite
- Custom CSS animations

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator
- Helmet (security)
- CORS
- Rate limiting

## 📦 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/silicomatics
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔒 Security Features

- **Password Hashing**: Using bcrypt with salt
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Both client and server-side
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Security headers
- **XSS Protection**: Input sanitization

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `brew services list | grep mongodb`
- Check connection string in `backend/.env`

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Errors
- Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Restart backend server after changing environment variables

### Cannot Find Module Errors
```bash
# Reinstall dependencies
cd backend && npm install
cd ../silico-frontend && npm install
```

## 📚 Documentation

### Setup & Usage
- [Complete Setup Guide](SETUP_GUIDE.md) - Detailed installation instructions
- [Backend API Documentation](backend/README.md) - API endpoints and usage

### Testing
- [Testing Guide](backend/TESTING_GUIDE.md) - Comprehensive testing documentation
- [Test Results](backend/TEST_RESULTS.md) - Latest test execution results
- [Quick Test Reference](backend/QUICK_TEST.md) - Fast testing commands
- [Test Coverage Map](backend/TEST_COVERAGE_MAP.md) - Visual coverage overview
- [Testing Package Overview](backend/README_TESTING.md) - Complete testing suite details

## 🚀 Deployment

### Backend
- Deploy to: Heroku, Railway, DigitalOcean, AWS, etc.
- Use MongoDB Atlas for production database
- Set environment variables on hosting platform

### Frontend
- Deploy to: Vercel, Netlify, GitHub Pages
- Update `VITE_API_URL` to production backend URL
- Build command: `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution

---

**Happy Coding!** 🎉

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
