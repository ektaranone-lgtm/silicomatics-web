# SilicoInformatics Backend API

A Node.js/Express backend API with MongoDB for user authentication and data management.

## Features

- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ MongoDB integration with Mongoose
- ✅ TypeScript support

## Prerequisites

- Node.js (v20.19.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn or pnpm

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Change `JWT_SECRET` to a secure random string
   - Update `FRONTEND_URL` if your frontend runs on a different port

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition: https://www.mongodb.com/docs/manual/installation/
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
3. The default connection string is: `mongodb://localhost:27017/silicomatics`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add your IP address to the whitelist (or use 0.0.0.0/0 for development)
4. Create a database user
5. Get your connection string and update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/silicomatics?retryWrites=true&w=majority
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register a new user
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "ACME Corp",
  "industry": "pharmaceutical",
  "password": "securePassword123",
  "agreedToTerms": true
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get current user (Protected)
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

### Health Check
```http
GET /api/health
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── controllers/
│   │   └── authController.ts # Authentication logic
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication middleware
│   │   └── validate.ts       # Request validation middleware
│   ├── models/
│   │   └── User.ts           # User schema and model
│   ├── routes/
│   │   └── authRoutes.ts     # Authentication routes
│   └── server.ts             # Main server file
├── .env                      # Environment variables (not in git)
├── .env.example              # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/silicomatics` |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRE` | JWT token expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured to accept requests only from frontend
- **Helmet**: Adds security headers
- **Environment Variables**: Sensitive data stored in .env file

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "ACME Corp",
    "industry": "pharmaceutical",
    "password": "securePassword123",
    "agreedToTerms": true
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Get User (replace TOKEN with actual JWT)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- For MongoDB Atlas, verify IP whitelist settings

### Port Already in Use
- Change the `PORT` in `.env` file
- Or kill the process using port 5000:
  ```bash
  lsof -ti:5000 | xargs kill -9
  ```

### CORS Errors
- Verify `FRONTEND_URL` matches your frontend URL
- Check if the frontend is sending credentials properly

## License

ISC
