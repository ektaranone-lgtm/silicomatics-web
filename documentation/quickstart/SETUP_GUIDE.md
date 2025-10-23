# SilicoInformatics - Full Stack Setup Guide

This guide will help you set up the complete MongoDB-powered backend with frontend integration.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v20.19.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Download](https://www.mongodb.com/try/download/community) or [Sign up for Atlas](https://www.mongodb.com/cloud/atlas/register)
- **npm**, **yarn**, or **pnpm** (npm comes with Node.js)
- **Git** (optional, for version control)

## 🗄️ MongoDB Setup

You have two options for MongoDB:

### Option 1: Local MongoDB (Recommended for Development)

#### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongosh
```

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows Service
4. Verify by opening Command Prompt and running: `mongosh`

### Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (select Free Tier)
4. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password (save these!)
5. Whitelist your IP:
   - Go to Network Access
   - Add IP Address
   - Use `0.0.0.0/0` for development (allows all IPs)
6. Get your connection string:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🚀 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

The `.env` file is already created. Update it if needed:

```bash
# For local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/silicomatics

# For MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/silicomatics?retryWrites=true&w=majority

# Important: Change JWT_SECRET in production!
JWT_SECRET=silicomatics-super-secret-jwt-key-change-in-production-2024
```

### 4. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build
npm start
```

The backend will start on **http://localhost:5000**

### 5. Verify Backend is Running

Open a new terminal and test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

Open a **new terminal** window and:
```bash
cd silico-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

The `.env` file is already created with the default backend URL:
```
VITE_API_URL=http://localhost:5000/api
```

No changes needed if backend is running on port 5000.

### 4. Start the Frontend Server

```bash
npm run dev
```

The frontend will start on **http://localhost:5173**

## 🧪 Testing the Integration

### 1. Open Your Browser

Navigate to: **http://localhost:5173**

### 2. Test Signup

1. Click on "Sign up" or navigate to the signup page
2. Fill in the form with test data:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Company: Test Company
   - Industry: Pharmaceutical
   - Password: password123
   - Confirm Password: password123
   - Check "I agree to the Terms"
3. Click "Create Account"
4. You should see a success message and be redirected to login

### 3. Test Login

1. On the login page, enter:
   - Email: john@example.com
   - Password: password123
2. Click "Sign In"
3. You should be logged in and redirected to the home page

### 4. Verify in MongoDB

#### Using mongosh (CLI):
```bash
mongosh
use silicomatics
db.users.find().pretty()
```

#### Using MongoDB Compass (GUI):
1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. Navigate to `silicomatics` database → `users` collection
4. You should see your registered user (password will be hashed)

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "company": "TechCorp",
    "industry": "biotechnology",
    "password": "securepass123",
    "agreedToTerms": true
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

Save the `token` from the response for the next request.

### Get Current User (Protected Route)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure

```
silicomatics-web/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts    # MongoDB connection
│   │   ├── controllers/
│   │   │   └── authController.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts        # JWT authentication
│   │   │   └── validate.ts
│   │   ├── models/
│   │   │   └── User.ts        # User schema
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   └── server.ts          # Main entry point
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── silico-frontend/           # Vue.js frontend
    ├── src/
    │   ├── services/
    │   │   └── api.ts        # API service for backend calls
    │   ├── views/
    │   │   ├── SignupView.vue
    │   │   └── LoginView.vue
    │   └── ...
    ├── .env                  # Frontend environment variables
    └── package.json
```

## 🔧 Troubleshooting

### Backend Issues

#### "Cannot connect to MongoDB"
- **Local MongoDB**: Ensure MongoDB service is running
  ```bash
  # macOS
  brew services list | grep mongodb
  
  # Linux
  sudo systemctl status mongod
  ```
- **MongoDB Atlas**: Check connection string, username, password, and IP whitelist

#### "Port 5000 already in use"
- Change the PORT in `backend/.env`
- Or kill the process using port 5000:
  ```bash
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID [PID] /F
  ```

### Frontend Issues

#### "Network Error" or "Failed to fetch"
- Ensure backend is running on port 5000
- Check `silico-frontend/.env` has correct VITE_API_URL
- Check browser console for CORS errors

#### CORS Errors
- Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Restart the backend after changing environment variables

### Database Issues

#### "User already exists" error
- The email is already registered in the database
- Use a different email or delete the user from MongoDB:
  ```bash
  mongosh
  use silicomatics
  db.users.deleteOne({ email: "john@example.com" })
  ```

## 🔒 Security Notes

- **JWT_SECRET**: Change this to a long, random string in production
- **MongoDB**: In production, use MongoDB Atlas with proper authentication
- **CORS**: In production, set specific frontend URLs, not wildcards
- **Environment Variables**: Never commit `.env` files to version control
- **Passwords**: All passwords are hashed with bcrypt before storage

## 📚 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/health` | Health check | No |

## 🎉 Next Steps

Now that your backend is set up and connected:

1. ✅ Users can sign up and their data is stored in MongoDB
2. ✅ Users can log in and receive a JWT token
3. ✅ Authentication is handled securely with bcrypt password hashing
4. ✅ Frontend communicates with backend API

### Suggested Enhancements:

- Add password reset functionality
- Implement email verification
- Add user profile editing
- Create protected routes in the frontend
- Add refresh token functionality
- Implement logout everywhere feature
- Add user roles and permissions

## 📞 Need Help?

- Check the `backend/README.md` for detailed backend documentation
- Review the API responses in browser DevTools (Network tab)
- Check backend logs in the terminal where it's running
- Verify MongoDB data using MongoDB Compass

## 🚀 Deployment

For production deployment:

1. **Backend**: Deploy to platforms like Heroku, DigitalOcean, AWS, or Railway
2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
3. **Database**: Use MongoDB Atlas for production database
4. Update environment variables for production URLs
5. Enable HTTPS for both frontend and backend
6. Implement proper logging and monitoring

---

**Congratulations!** 🎊 Your full-stack application with MongoDB backend is now running!
