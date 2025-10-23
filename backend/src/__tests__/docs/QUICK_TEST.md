# 🚀 Quick Test Reference

## Fastest Way to Test MongoDB Backend

### 1️⃣ Quick Test (Recommended - 10 seconds)
```bash
npm run test:manual
```
**What it does:** Runs 10 comprehensive tests and cleans up after itself.

---

### 2️⃣ Test with Backend Running
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run API tests
./test-api.sh
```
**What it does:** Tests all API endpoints with real HTTP requests.

---

### 3️⃣ Interactive API Testing
1. Start server: `npm run dev`
2. Open `src/__tests__/api-test.http` in VS Code
3. Click "Send Request" above any test

**Requires:** REST Client extension in VS Code

---

### 4️⃣ Unit Tests (Full Suite)
```bash
npm test
```
**What it does:** Runs Jest test suite with coverage report.

---

### 5️⃣ MongoDB Shell Inspection
```bash
mongosh
use silicomatics
db.users.find().pretty()
db.users.countDocuments()
```
**What it does:** Direct database inspection.

---

## Expected Results

### ✅ All Tests Should Show:
- Database connection: ✅
- User creation: ✅
- Password hashing: ✅
- Data validation: ✅
- Query operations: ✅
- Cleanup: ✅

### 🎯 All API Tests Should Return:
- Health check: 200 OK
- Signup (valid): 201 Created
- Login (valid): 200 OK
- Invalid requests: 400/401 errors

---

## Troubleshooting

### MongoDB Not Running?
```bash
# macOS
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

### Port 5000 In Use?
```bash
lsof -ti:5000 | xargs kill -9
```

### Clear Test Database
```bash
mongosh
use silicomatics-test
db.dropDatabase()
```

---

## What Gets Tested?

✅ Database connection  
✅ User CRUD operations  
✅ Password hashing (bcrypt)  
✅ Email validation  
✅ Unique constraints  
✅ Authentication flow  
✅ JWT token generation  
✅ Error handling  
✅ Data validation  
✅ Field requirements  

---

## Test Files Location

```
backend/
├── src/__tests__/
│   ├── manual-test.ts        # Quick manual test
│   ├── database.test.ts      # Jest: Database tests
│   ├── user.model.test.ts    # Jest: User model tests
│   └── api-test.http         # REST Client tests
├── test-api.sh               # Shell script API tests
├── TESTING_GUIDE.md          # Comprehensive guide
└── TEST_RESULTS.md           # Latest test results
```

---

## One-Liner Test Commands

```bash
# Everything in one go
npm install && npm run test:manual && echo "✨ All tests passed!"

# Test + start server
npm run test:manual && npm run dev

# Full test suite
npm test -- --coverage --verbose
```

---

**Quick Tip:** Run `npm run test:manual` after any database schema changes!
