# Quick Reference Guide

## 🚀 Starting the Application

### Start Both Servers (macOS/Linux)
```bash
./start.sh
```

### Start Backend Only
```bash
cd backend
npm run dev
```

### Start Frontend Only
```bash
cd silico-frontend
npm run dev
```

## 📍 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |

## 🗄️ MongoDB Commands

### Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Stop MongoDB
```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

### Connect to MongoDB Shell
```bash
mongosh
```

### Database Operations
```javascript
// Show databases
show dbs

// Use silicomatics database
use silicomatics

// Show collections
show collections

// View all users
db.users.find().pretty()

// Find user by email
db.users.findOne({ email: "john@example.com" })

// Count users
db.users.countDocuments()

// Delete a user
db.users.deleteOne({ email: "john@example.com" })

// Delete all users
db.users.deleteMany({})

// Drop the entire collection
db.users.drop()
```

## 🔧 Common Tasks

### Install/Reinstall Dependencies

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd silico-frontend
rm -rf node_modules package-lock.json
npm install
```

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd silico-frontend
npm run build
```

### Run Production Build

```bash
# Backend
cd backend
npm start

# Frontend (preview)
cd silico-frontend
npm run preview
```

## 🧪 Testing API with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Test Corp",
    "industry": "pharmaceutical",
    "password": "password123",
    "agreedToTerms": true
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (replace TOKEN)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Not Running
```bash
# Check status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux

# Start if not running
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Clear MongoDB Database
```bash
mongosh
use silicomatics
db.dropDatabase()
```

### Reset Local Storage (Browser)
Open Browser Console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

### View Backend Logs
Backend logs appear in the terminal where you ran `npm run dev`

### View Frontend Logs
- Open Browser DevTools (F12)
- Go to Console tab
- Also check Network tab for API calls

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/silicomatics
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔍 Check Running Processes

```bash
# Check what's running on port 5000
lsof -i :5000

# Check what's running on port 5173
lsof -i :5173

# Check MongoDB process
ps aux | grep mongod
```

## 📊 Useful MongoDB Queries

```javascript
// Find users created today
db.users.find({
  createdAt: {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
}).pretty()

// Find users by industry
db.users.find({ industry: "pharmaceutical" })

// Count users by industry
db.users.aggregate([
  { $group: { _id: "$industry", count: { $sum: 1 } } }
])

// Update user email
db.users.updateOne(
  { email: "old@example.com" },
  { $set: { email: "new@example.com" } }
)

// Add field to all users
db.users.updateMany(
  {},
  { $set: { isVerified: false } }
)
```

## 🎨 Frontend Development

### Add New Route
1. Create component in `src/views/`
2. Add route in `src/router/index.ts`
3. Add navigation link in components

### Call API from Component
```typescript
import apiService from '@/services/api'

// In your component
const response = await apiService.login(credentials)
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Set specific CORS origin
- [ ] Use MongoDB Atlas with authentication
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Never log passwords
- [ ] Use environment variables for secrets

## 📦 Project Structure Quick Ref

```
backend/
├── src/
│   ├── config/database.ts      # MongoDB connection
│   ├── controllers/            # Business logic
│   ├── middleware/             # Auth, validation
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   └── server.ts               # Entry point

silico-frontend/
├── src/
│   ├── services/api.ts         # API calls
│   ├── views/                  # Page components
│   ├── router/                 # Routes config
│   └── main.ts                 # Entry point
```

## 🔗 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend configuration |
| `backend/src/server.ts` | Backend entry point |
| `backend/src/models/User.ts` | User schema |
| `silico-frontend/.env` | Frontend configuration |
| `silico-frontend/src/services/api.ts` | API service |
| `silico-frontend/src/views/SignupView.vue` | Signup page |
| `silico-frontend/src/views/LoginView.vue` | Login page |

## 📞 Getting Help

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check `ARCHITECTURE.md` for system design
3. Look at backend logs for API errors
4. Check browser console for frontend errors
5. Verify MongoDB is running
6. Ensure ports 5000 and 5173 are available

## 🎯 Common Error Messages

| Error | Solution |
|-------|----------|
| "MongoDB connection failed" | Start MongoDB service |
| "Port already in use" | Kill process on that port |
| "CORS error" | Check FRONTEND_URL in backend/.env |
| "Cannot find module" | Run `npm install` |
| "Invalid token" | Token expired or invalid, login again |
| "User already exists" | Email already registered |

## 💡 Pro Tips

1. Keep two terminal windows open (backend + frontend)
2. Use MongoDB Compass for visual database management
3. Use browser DevTools Network tab to debug API calls
4. Check backend terminal for detailed error messages
5. Use `.env.example` files as templates
6. Never commit `.env` files to git
7. Test API endpoints with cURL before frontend integration
8. Use meaningful commit messages
9. Keep dependencies updated
10. Document any changes you make

## 🚦 Startup Checklist

- [ ] MongoDB is running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Environment files configured
- [ ] Ports 5000 and 5173 are available
- [ ] Browser is ready
- [ ] Terminal windows open

---

**Quick Start:** `./start.sh` (macOS/Linux) or start backend and frontend manually

**URLs:** Frontend: `http://localhost:5173` | Backend: `http://localhost:5000`

**Database:** `mongosh` → `use silicomatics` → `db.users.find().pretty()`
