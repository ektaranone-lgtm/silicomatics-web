import mongoose from 'mongoose';
import connectDB from '../config/database.js';

describe('Database Connection Tests', () => {
  beforeAll(async () => {
    // Ensure we're using test database
    process.env.MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/silicomatics-test';
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should connect to MongoDB successfully', async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  test('should have correct database name', () => {
    const dbName = mongoose.connection.name;
    expect(dbName).toBeTruthy();
    console.log(`Connected to database: ${dbName}`);
  });

  test('should handle connection events', (done) => {
    const errorHandler = jest.fn();
    mongoose.connection.on('error', errorHandler);
    
    setTimeout(() => {
      expect(mongoose.connection.readyState).toBe(1);
      done();
    }, 1000);
  });
});
