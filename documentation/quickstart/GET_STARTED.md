# 🚀 Get Started in 5 Minutes

Follow this checklist to get your full-stack application running!

## ✅ Step 1: Install MongoDB (if not already installed)

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Windows
Download and install from: https://www.mongodb.com/try/download/community

### Or Use MongoDB Atlas (Cloud - Free Tier)
1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get connection string
4. Update `backend/.env` with your connection string

---

## ✅ Step 2: Verify MongoDB is Running

```bash
mongosh
```

If you see the MongoDB shell, you're good! Type `exit` to exit.

---

## ✅ Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for installation to complete...

---

## ✅ Step 4: Check Backend Environment

The `.env` file is already configured! Review it:

```bash
cat .env
```

You should see:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/silicomatics
JWT_SECRET=silicomatics-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

✅ **For local MongoDB:** No changes needed!  
⚠️ **For MongoDB Atlas:** Update `MONGODB_URI` with your connection string

---

## ✅ Step 5: Start Backend Server

### Option A: Development Mode (Recommended)
```bash
npm run dev
```

### Option B: Production Mode
```bash
npm run build
npm start
```

✅ **Success:** You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

⚠️ **Keep this terminal open!**

---

## ✅ Step 6: Test Backend (New Terminal)

Open a **new terminal** window:

```bash
curl http://localhost:5000/api/health
```

✅ **Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

---

## ✅ Step 7: Install Frontend Dependencies

In the **new terminal**:

```bash
cd silico-frontend
npm install
```

---

## ✅ Step 8: Check Frontend Environment

```bash
cat .env
```

Should show:
```
VITE_API_URL=http://localhost:5000/api
```

✅ No changes needed for local development!

---

## ✅ Step 9: Start Frontend Server

```bash
npm run dev
```

✅ **Success:** You should see:
```
VITE ready in 500ms
➜  Local:   http://localhost:5173/
```

⚠️ **Keep this terminal open too!**

---

## ✅ Step 10: Open Your Browser

Navigate to: **http://localhost:5173**

---

## ✅ Step 11: Test Signup

1. Click **"Sign up"** or navigate to `/signup`
2. Fill out the form:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Company: `Test Company` (optional)
   - Industry: Select any (e.g., `Pharmaceutical`)
   - Password: `password123`
   - Confirm Password: `password123`
   - ✅ Check "I agree to the Terms"
3. Click **"Create Account"**

✅ **Success:** You should see a success message and be redirected to login!

---

## ✅ Step 12: Test Login

1. On the login page, enter:
   - Email: `test@example.com`
   - Password: `password123`
2. Click **"Sign In"**

✅ **Success:** You should be logged in and redirected to the home page!

---

## ✅ Step 13: Verify Database

Open a **third terminal**:

```bash
mongosh
```

Then in the MongoDB shell:
```javascript
use silicomatics
db.users.find().pretty()
```

✅ **You should see your user!** Notice:
- Email is stored
- Password is **hashed** (not plain text)
- Timestamps are recorded

Type `exit` to exit MongoDB shell.

---

## 🎉 Congratulations!

Your full-stack application is now running!

### What's Running:

| Component | URL | Terminal |
|-----------|-----|----------|
| 🎨 Frontend | http://localhost:5173 | Terminal 2 |
| 🔧 Backend API | http://localhost:5000 | Terminal 1 |
| 🗄️ MongoDB | Port 27017 | Background |

---

## 🎯 Quick Actions

### View Backend Logs
Check **Terminal 1** (where backend is running)

### View Frontend Logs
- Check **Terminal 2** (where frontend is running)
- Open Browser DevTools (F12) → Console tab

### View Database
```bash
mongosh
use silicomatics
db.users.find().pretty()
```

### Stop Servers
Press **Ctrl+C** in each terminal

### Restart Everything
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd silico-frontend && npm run dev
```

### Alternative: Use Start Script (macOS/Linux)
```bash
./start.sh
```
This starts both servers automatically!

---

## 🐛 Troubleshooting

### ❌ "MongoDB connection failed"
**Solution:** Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### ❌ "Port 5000 already in use"
**Solution:** Kill the process
```bash
lsof -ti:5000 | xargs kill -9
```

### ❌ "Port 5173 already in use"
**Solution:** Kill the process
```bash
lsof -ti:5173 | xargs kill -9
```

### ❌ "Cannot find module" error
**Solution:** Install dependencies
```bash
cd backend && npm install
cd ../silico-frontend && npm install
```

### ❌ CORS error in browser
**Solution:** 
1. Verify backend is running on port 5000
2. Check `backend/.env` has `FRONTEND_URL=http://localhost:5173`
3. Restart backend server

### ❌ "User already exists" error
**Solution:** Use a different email or delete the user:
```bash
mongosh
use silicomatics
db.users.deleteOne({ email: "test@example.com" })
exit
```

---

## 📚 Next Steps

### 1. Explore the Documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **ARCHITECTURE.md** - How the system works
- **QUICK_REFERENCE.md** - Command reference
- **IMPLEMENTATION_SUMMARY.md** - What was built

### 2. Try the API Directly
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "industry": "pharmaceutical",
    "password": "password123",
    "agreedToTerms": true
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

### 3. Explore the Code
- **Backend:** `backend/src/`
  - `server.ts` - Main entry point
  - `models/User.ts` - Database schema
  - `controllers/authController.ts` - Business logic
  
- **Frontend:** `silico-frontend/src/`
  - `services/api.ts` - API service
  - `views/SignupView.vue` - Signup page
  - `views/LoginView.vue` - Login page

### 4. Customize
- Change the JWT secret in `backend/.env`
- Add new fields to the User model
- Implement logout functionality
- Add protected routes
- Create a user profile page

---

## 🎓 What You've Accomplished

✅ Set up a MongoDB database  
✅ Created a Node.js/Express backend with TypeScript  
✅ Implemented secure user authentication with JWT  
✅ Built password hashing with bcrypt  
✅ Connected Vue.js frontend to backend API  
✅ Learned full-stack development workflow  

---

## 💡 Pro Tips

1. **Keep terminals organized:** Use 2-3 terminals (backend, frontend, database)
2. **Use MongoDB Compass:** Visual database management (download from mongodb.com)
3. **Browser DevTools:** Use Network tab to debug API calls (F12)
4. **Check logs:** Backend terminal shows detailed error messages
5. **Test incrementally:** Test each component separately before integration

---

## 🚦 Status Check

Your system is working if:

- ✅ Backend terminal shows: "Server is running on port 5000"
- ✅ Frontend terminal shows: "Local: http://localhost:5173"
- ✅ MongoDB is connected (check backend terminal)
- ✅ Health endpoint returns success: `curl http://localhost:5000/api/health`
- ✅ You can signup and login in the browser
- ✅ Users appear in MongoDB: `mongosh` → `use silicomatics` → `db.users.find()`

---

## 📞 Need Help?

1. Check terminal logs for errors
2. Review browser console (F12)
3. Verify MongoDB is running: `brew services list | grep mongodb`
4. Check the SETUP_GUIDE.md for detailed instructions
5. Review QUICK_REFERENCE.md for common commands

---

## 🎉 You're All Set!

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:5000  
**Database:** `mongosh` → `use silicomatics`

**Happy Coding!** 🚀

---

### Quick Command Reference

```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Start Backend (in backend/ directory)
npm run dev

# Start Frontend (in silico-frontend/ directory)
npm run dev

# View Database
mongosh
use silicomatics
db.users.find().pretty()

# Test API
curl http://localhost:5000/api/health
```
