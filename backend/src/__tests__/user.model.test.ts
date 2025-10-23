import mongoose from 'mongoose';
import User, { IUser } from '../models/User.js';

describe('User Model Tests', () => {
  let testUserId: string;

  beforeAll(async () => {
    // Connect to test database
    const mongoURI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/silicomatics-test';
    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    // Clean up and close connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clean up before each test
    await User.deleteMany({});
  });

  describe('User Creation', () => {
    test('should create a new user with valid data', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'Test Company',
        industry: 'pharmaceutical',
        password: 'SecurePass123!',
        agreedToTerms: true
      };

      const user = await User.create(userData);
      testUserId = user._id.toString();

      expect(user._id).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.email).toBe(userData.email.toLowerCase());
      expect(user.company).toBe(userData.company);
      expect(user.industry).toBe(userData.industry);
      expect(user.agreedToTerms).toBe(true);
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    test('should hash password before saving', async () => {
      const password = 'MyPassword123!';
      const user = await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        industry: 'biotechnology',
        password: password,
        agreedToTerms: true
      });

      const savedUser = await User.findById(user._id).select('+password');
      expect(savedUser?.password).toBeDefined();
      expect(savedUser?.password).not.toBe(password);
      expect(savedUser?.password.length).toBeGreaterThan(password.length);
    });

    test('should convert email to lowercase', async () => {
      const user = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'TEST@EXAMPLE.COM',
        industry: 'healthcare',
        password: 'Password123!',
        agreedToTerms: true
      });

      expect(user.email).toBe('test@example.com');
    });
  });

  describe('User Validation', () => {
    test('should fail without required firstName', async () => {
      const userData = {
        lastName: 'Doe',
        email: 'test@example.com',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail without required lastName', async () => {
      const userData = {
        firstName: 'John',
        email: 'test@example.com',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail without required email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail with invalid email format', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail with password less than 8 characters', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        industry: 'pharmaceutical',
        password: 'Pass12!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail without agreeing to terms', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: false
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should fail with invalid industry', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        industry: 'invalid-industry',
        password: 'Password123!',
        agreedToTerms: true
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    test('should enforce unique email constraint', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'duplicate@example.com',
        industry: 'pharmaceutical',
        password: 'Password123!',
        agreedToTerms: true
      };

      await User.create(userData);
      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('Password Comparison', () => {
    test('should correctly compare valid password', async () => {
      const password = 'MySecurePassword123!';
      const user = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'password-test@example.com',
        industry: 'biotechnology',
        password: password,
        agreedToTerms: true
      });

      const savedUser = await User.findById(user._id).select('+password');
      const isMatch = await savedUser?.comparePassword(password);
      expect(isMatch).toBe(true);
    });

    test('should reject invalid password', async () => {
      const password = 'MySecurePassword123!';
      const user = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'password-test2@example.com',
        industry: 'biotechnology',
        password: password,
        agreedToTerms: true
      });

      const savedUser = await User.findById(user._id).select('+password');
      const isMatch = await savedUser?.comparePassword('WrongPassword');
      expect(isMatch).toBe(false);
    });
  });

  describe('User Query Operations', () => {
    beforeEach(async () => {
      // Create multiple test users
      await User.create([
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice@example.com',
          industry: 'pharmaceutical',
          password: 'Password123!',
          agreedToTerms: true
        },
        {
          firstName: 'Bob',
          lastName: 'Williams',
          email: 'bob@example.com',
          industry: 'biotechnology',
          password: 'Password123!',
          agreedToTerms: true
        },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'charlie@example.com',
          industry: 'healthcare',
          password: 'Password123!',
          agreedToTerms: true
        }
      ]);
    });

    test('should find user by email', async () => {
      const user = await User.findOne({ email: 'alice@example.com' });
      expect(user).toBeDefined();
      expect(user?.firstName).toBe('Alice');
    });

    test('should find users by industry', async () => {
      const users = await User.find({ industry: 'pharmaceutical' });
      expect(users.length).toBe(1);
      expect(users[0].firstName).toBe('Alice');
    });

    test('should count total users', async () => {
      const count = await User.countDocuments();
      expect(count).toBe(3);
    });

    test('should update user information', async () => {
      const user = await User.findOne({ email: 'alice@example.com' });
      user!.company = 'New Company';
      await user!.save();

      const updatedUser = await User.findById(user!._id);
      expect(updatedUser?.company).toBe('New Company');
    });

    test('should delete user', async () => {
      const user = await User.findOne({ email: 'alice@example.com' });
      await User.findByIdAndDelete(user!._id);

      const deletedUser = await User.findById(user!._id);
      expect(deletedUser).toBeNull();
    });

    test('should not return password by default', async () => {
      const user = await User.findOne({ email: 'alice@example.com' });
      expect(user?.password).toBeUndefined();
    });

    test('should return password when explicitly selected', async () => {
      const user = await User.findOne({ email: 'alice@example.com' }).select('+password');
      expect(user?.password).toBeDefined();
    });
  });
});
