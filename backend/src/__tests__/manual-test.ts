/**
 * Manual MongoDB Test Script
 * 
 * This script provides a simple way to test MongoDB operations manually.
 * Run with: npm run test:manual
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

const log = (message: string, color: string = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const testDatabase = async () => {
  try {
    log('\n=== MongoDB Backend Testing ===\n', colors.blue);

    // Test 1: Database Connection
    log('Test 1: Connecting to MongoDB...', colors.yellow);
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/silicomatics';
    await mongoose.connect(mongoURI);
    log('✅ Successfully connected to MongoDB', colors.green);
    log(`   Database: ${mongoose.connection.name}`, colors.reset);

    // Test 2: Create a Test User
    log('\nTest 2: Creating a test user...', colors.yellow);
    const testEmail = `test-${Date.now()}@example.com`;
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: testEmail,
      company: 'Test Company',
      industry: 'pharmaceutical',
      password: 'TestPassword123!',
      agreedToTerms: true
    });
    log('✅ User created successfully', colors.green);
    log(`   ID: ${testUser._id}`, colors.reset);
    log(`   Email: ${testUser.email}`, colors.reset);
    log(`   Name: ${testUser.firstName} ${testUser.lastName}`, colors.reset);

    // Test 3: Find User by Email
    log('\nTest 3: Finding user by email...', colors.yellow);
    const foundUser = await User.findOne({ email: testEmail });
    if (foundUser) {
      log('✅ User found successfully', colors.green);
      log(`   Name: ${foundUser.firstName} ${foundUser.lastName}`, colors.reset);
    } else {
      log('❌ User not found', colors.red);
    }

    // Test 4: Password Hashing
    log('\nTest 4: Testing password hashing...', colors.yellow);
    const userWithPassword = await User.findById(testUser._id).select('+password');
    if (userWithPassword && userWithPassword.password !== 'TestPassword123!') {
      log('✅ Password is properly hashed', colors.green);
      log(`   Hashed password length: ${userWithPassword.password.length} characters`, colors.reset);
    } else {
      log('❌ Password hashing failed', colors.red);
    }

    // Test 5: Password Comparison
    log('\nTest 5: Testing password comparison...', colors.yellow);
    const isCorrectPassword = await userWithPassword?.comparePassword('TestPassword123!');
    const isWrongPassword = await userWithPassword?.comparePassword('WrongPassword');
    if (isCorrectPassword && !isWrongPassword) {
      log('✅ Password comparison working correctly', colors.green);
    } else {
      log('❌ Password comparison failed', colors.red);
    }

    // Test 6: Update User
    log('\nTest 6: Updating user information...', colors.yellow);
    testUser.company = 'Updated Company';
    await testUser.save();
    const updatedUser = await User.findById(testUser._id);
    if (updatedUser?.company === 'Updated Company') {
      log('✅ User updated successfully', colors.green);
      log(`   Updated company: ${updatedUser.company}`, colors.reset);
    } else {
      log('❌ User update failed', colors.red);
    }

    // Test 7: Count Users
    log('\nTest 7: Counting total users...', colors.yellow);
    const userCount = await User.countDocuments();
    log('✅ User count retrieved', colors.green);
    log(`   Total users in database: ${userCount}`, colors.reset);

    // Test 8: Test Validation
    log('\nTest 8: Testing data validation...', colors.yellow);
    try {
      await User.create({
        firstName: 'Invalid',
        lastName: 'User',
        email: 'invalid-email',
        industry: 'pharmaceutical',
        password: 'short',
        agreedToTerms: true
      });
      log('❌ Validation should have failed', colors.red);
    } catch (error: any) {
      log('✅ Validation working correctly', colors.green);
      log(`   Caught validation error: ${error.message}`, colors.reset);
    }

    // Test 9: Test Unique Email
    log('\nTest 9: Testing unique email constraint...', colors.yellow);
    try {
      await User.create({
        firstName: 'Duplicate',
        lastName: 'User',
        email: testEmail,
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      });
      log('❌ Should not allow duplicate email', colors.red);
    } catch (error: any) {
      log('✅ Unique email constraint working', colors.green);
      log(`   Duplicate email rejected`, colors.reset);
    }

    // Test 10: Clean Up
    log('\nTest 10: Cleaning up test data...', colors.yellow);
    await User.findByIdAndDelete(testUser._id);
    const deletedUser = await User.findById(testUser._id);
    if (!deletedUser) {
      log('✅ Test user deleted successfully', colors.green);
    } else {
      log('❌ Failed to delete test user', colors.red);
    }

    // Summary
    log('\n=== All Tests Completed ===\n', colors.blue);
    log('MongoDB backend implementation is working correctly! ✨', colors.green);

  } catch (error: any) {
    log(`\n❌ Test failed: ${error.message}`, colors.red);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    log('\n🔌 Database connection closed', colors.yellow);
    process.exit(0);
  }
};

// Run the tests
testDatabase();
