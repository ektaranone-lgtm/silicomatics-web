# Backend MongoDB Testing Guide

This guide provides comprehensive instructions for testing the MongoDB backend implementation for the SilicoInformatics application.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Manual Testing](#manual-testing)
- [API Testing](#api-testing)
- [Test Coverage](#test-coverage)

## ✅ Prerequisites

Before running the tests, ensure you have:

1. **MongoDB installed and running**
   ```bash
   # Check if MongoDB is running
   mongosh --eval "db.version()" --quiet
   ```

2. **Dependencies installed**
   ```bash
   npm install
   ```

3. **Environment variables set up**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/silicomatics
   MONGODB_TEST_URI=mongodb://localhost:27017/silicomatics-test
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

## 🧪 Test Types

### 1. Unit Tests (Jest)

Automated tests for database operations and user model validation.

**Files:**
- `src/__tests__/database.test.ts` - Database connection tests
- `src/__tests__/user.model.test.ts` - User model CRUD and validation tests

### 2. Manual Test Script

A comprehensive script that tests all MongoDB operations with colored output.

**File:**
- `src/__tests__/manual-test.ts`

### 3. API Tests

HTTP requests to test the REST API endpoints.

**File:**
- `src/__tests__/api-test.http` - Use with REST Client extension in VS Code

## 🚀 Running Tests

### Automated Tests (Jest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

### Manual Test Script

This is the **recommended way** to quickly verify your MongoDB setup:

```bash
npm run test:manual
```

The manual test script will:
1. ✅ Connect to MongoDB
2. ✅ Create a test user
3. ✅ Test password hashing
4. ✅ Test password comparison
5. ✅ Test user queries
6. ✅ Test data validation
7. ✅ Test unique constraints
8. ✅ Clean up test data

**Expected Output:**
```
=== MongoDB Backend Testing ===

Test 1: Connecting to MongoDB...
✅ Successfully connected to MongoDB
   Database: silicomatics

Test 2: Creating a test user...
✅ User created successfully
   ID: 6512a3b4c5d6e7f8a9b0c1d2
   Email: test-1698123456789@example.com
   Name: Test User

...

=== All Tests Completed ===

MongoDB backend implementation is working correctly! ✨
```

### API Tests (Interactive)

1. **Start the backend server:**
   ```bash
   npm run dev
   ```

2. **Install REST Client extension** in VS Code (if not installed)

3. **Open** `src/__tests__/api-test.http`

4. **Click "Send Request"** above any test to execute it

#### Available API Tests:

- ✅ Health check
- ✅ User signup (valid)
- ✅ User signup (various validation errors)
- ✅ User login (valid/invalid credentials)
- ✅ Get current user profile
- ✅ Multiple industry types

## 🔍 Manual Testing with MongoDB Shell

You can also test directly in the MongoDB shell:

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use silicomatics

# View all users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find user by email
db.users.findOne({ email: "john.doe@example.com" })

# Delete test users
db.users.deleteMany({ email: /test-.*@example.com/ })

# Drop the entire users collection (CAREFUL!)
db.users.drop()
```

## 📊 Test Coverage

Run the following command to see test coverage:

```bash
npm test -- --coverage
```

This will generate:
- Console output with coverage summary
- HTML report in `coverage/` directory
- LCOV report for CI/CD integration

**Coverage Goals:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
```bash
# Start MongoDB
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Test Database Cleanup

If you need to reset the test database:

```bash
mongosh
use silicomatics-test
db.dropDatabase()
```

## 📝 Writing New Tests

### Example: Adding a User Model Test

```typescript
test('should validate custom requirement', async () => {
  const userData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    industry: 'pharmaceutical',
    password: 'Password123!',
    agreedToTerms: true
  };

  const user = await User.create(userData);
  expect(user).toBeDefined();
  // Add your assertions
});
```

### Example: Adding an API Test

Add to `api-test.http`:

```http
### Test: Your New Test Name
POST {{baseUrl}}/api/auth/your-endpoint
Content-Type: {{contentType}}

{
  "field": "value"
}
```

## 🎯 What Each Test Validates

### Database Tests
- ✅ MongoDB connection establishment
- ✅ Database name verification
- ✅ Connection event handling

### User Model Tests
- ✅ User creation with valid data
- ✅ Password hashing on save
- ✅ Email lowercase conversion
- ✅ Required field validation
- ✅ Email format validation
- ✅ Password length validation
- ✅ Terms agreement validation
- ✅ Industry enum validation
- ✅ Unique email constraint
- ✅ Password comparison method
- ✅ User query operations
- ✅ User update operations
- ✅ User deletion
- ✅ Password field exclusion by default

### API Tests
- ✅ Server health check
- ✅ User registration
- ✅ User authentication
- ✅ Token generation
- ✅ Protected route access
- ✅ Error handling
- ✅ Validation error responses

## 📚 Additional Resources

- [Mongoose Documentation](https://mongoosejs.com/)
- [Jest Testing Documentation](https://jestjs.io/)
- [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [MongoDB Manual](https://docs.mongodb.com/manual/)

## 🔐 Best Practices

1. **Always use a separate test database** - Don't test on production data
2. **Clean up after tests** - Use `afterEach` or `afterAll` hooks
3. **Test edge cases** - Invalid data, empty fields, SQL injection attempts
4. **Monitor test coverage** - Aim for > 80% coverage
5. **Write descriptive test names** - Make failures easy to understand
6. **Test both success and failure paths** - Ensure errors are handled properly

---

Happy Testing! 🚀
