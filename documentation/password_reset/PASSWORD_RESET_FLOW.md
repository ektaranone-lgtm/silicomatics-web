# Password Reset Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PASSWORD RESET FLOW                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│  1. USER INITIATES   │
│   Forgot Password    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Frontend: /forgot-password                              │
│  - User enters email address                             │
│  - Validates email format                                │
│  - Sends POST to /api/auth/forgot-password              │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Backend: forgotPassword Controller                      │
│  1. Validates email exists in database                   │
│  2. Generates random reset token (36 chars)              │
│  3. Hashes token with bcrypt                             │
│  4. Stores hashed token + expiry (10 min) in User model │
│  5. Calls emailService.sendPasswordResetEmail()          │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Email Service                                           │
│  DEV MODE:                                               │
│    - Logs email to console                               │
│    - Displays reset URL with token                       │
│  PRODUCTION:                                             │
│    - Sends HTML email via SendGrid/SES/etc              │
│    - Includes styled reset button + link                 │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Success Response                                        │
│  - Shows "Email sent" message                            │
│  - User instructed to check inbox                        │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────┐
│  2. USER RECEIVES    │
│      EMAIL           │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Email Content                                           │
│  Subject: Password Reset Request - SilicoInformatics    │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Hello [First Name]!                                │ │
│  │                                                    │ │
│  │ We received a request to reset your password.    │ │
│  │                                                    │ │
│  │      [  Reset Password Button  ]                 │ │
│  │                                                    │ │
│  │ Or copy this link:                                │ │
│  │ http://localhost:5173/reset-password?token=XXX   │ │
│  │                                                    │ │
│  │ ⚠️  Link expires in 10 minutes                    │ │
│  └────────────────────────────────────────────────────┘ │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────┐
│  3. USER CLICKS      │
│    RESET LINK        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Frontend: /reset-password?token=XXXXX                   │
│  Component: ResetPasswordView.vue                        │
│  1. onMounted() extracts token from URL query params     │
│  2. Shows loading spinner                                │
│  3. Calls GET /api/auth/verify-reset-token/:token       │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Backend: verifyResetToken Controller                    │
│  1. Finds users with unexpired tokens                    │
│  2. Compares provided token with hashed tokens           │
│  3. Returns success + user email OR error                │
└──────────┬───────────────────────────────────────────────┘
           │
           ├─────── Token Valid ───────┐
           │                           │
           ▼                           ▼
    ┌─────────────┐            ┌──────────────────┐
    │   INVALID   │            │   VALID TOKEN    │
    │   TOKEN     │            │                  │
    └──────┬──────┘            └────────┬─────────┘
           │                            │
           ▼                            ▼
┌────────────────────────┐    ┌─────────────────────────────────────────┐
│  Show Error Screen     │    │  Show Password Reset Form               │
│  - ❌ Error icon       │    │  - User email displayed                 │
│  - "Invalid/Expired"   │    │  - New password field                   │
│  - Request new link    │    │  - Confirm password field               │
└────────────────────────┘    │  - Show/hide password toggles           │
                              │  - Real-time password strength meter    │
                              │  - Requirements checklist:              │
                              │    ✓ 8+ characters                      │
                              │    ✓ Uppercase letter                   │
                              │    ✓ Lowercase letter                   │
                              │    ✓ Number                             │
                              └────────┬────────────────────────────────┘
                                       │
                                       ▼
                              ┌────────────────────┐
                              │  4. USER SUBMITS   │
                              │   NEW PASSWORD     │
                              └────────┬───────────┘
                                       │
                                       ▼
                              ┌─────────────────────────────────────────┐
                              │  Frontend Validation                    │
                              │  - Password length >= 8                 │
                              │  - Passwords match                      │
                              │  - Sends POST to /api/auth/reset-password│
                              │    Body: { token, password }            │
                              └────────┬────────────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────────────────────────────┐
                              │  Backend: resetPassword Controller      │
                              │  1. Validates token (same as verify)    │
                              │  2. Validates password requirements     │
                              │  3. Updates user.password (auto-hashed) │
                              │  4. Clears reset token fields           │
                              │  5. Saves user to database              │
                              │  6. Generates new JWT auth token        │
                              │  7. Returns success + token + user data │
                              └────────┬────────────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────────────────────────────┐
                              │  Frontend: Success Handling             │
                              │  - Stores JWT token in localStorage     │
                              │  - Shows success screen:                │
                              │    ✓ Success icon                       │
                              │    "Password Reset Successful!"         │
                              │  - Auto-redirects to /login in 3 sec    │
                              └────────┬────────────────────────────────┘
                                       │
                                       ▼
                              ┌────────────────────┐
                              │  5. REDIRECT TO    │
                              │     LOGIN PAGE     │
                              └────────┬───────────┘
                                       │
                                       ▼
                              ┌─────────────────────────────────────────┐
                              │  User Can Now Login                     │
                              │  - Email: [user email]                  │
                              │  - Password: [new password]             │
                              │  ✅ Authentication successful!          │
                              └─────────────────────────────────────────┘
```

## Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY MEASURES                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Token Security  │
└────────┬─────────┘
         │
         ├─► 1. Random Generation (36 characters)
         │   Math.random() + Math.random()
         │
         ├─► 2. Bcrypt Hashing
         │   Token hashed before database storage
         │   Original token only in email
         │
         ├─► 3. Time Expiry
         │   Expires in 10 minutes
         │   Checked on every verification
         │
         ├─► 4. One-Time Use
         │   Cleared after successful reset
         │   Can't be reused
         │
         └─► 5. No Token in Response
             Token never returned in API responses

┌────────────────────┐
│  Password Security │
└────────┬───────────┘
         │
         ├─► 1. Requirements Enforced
         │   Min 8 chars, uppercase, lowercase, number
         │
         ├─► 2. Bcrypt Hashing
         │   Salt rounds: 10
         │   Pre-save hook in User model
         │
         ├─► 3. Never Logged
         │   Passwords never appear in logs
         │
         └─► 4. Not Returned in API
             Password field excluded from responses

┌──────────────────┐
│  Rate Limiting   │
└────────┬─────────┘
         │
         └─► 100 requests per 15 minutes per IP
             Prevents brute force attacks

┌────────────────────────┐
│  Email Enumeration     │
│  Protection            │
└────────┬───────────────┘
         │
         └─► Same response whether user exists or not
             "If account exists, email sent"
```

## Database Schema Changes

```
┌─────────────────────────────────────────────────────┐
│  User Model (MongoDB)                               │
├─────────────────────────────────────────────────────┤
│  EXISTING FIELDS:                                   │
│  - _id: ObjectId                                    │
│  - firstName: String                                │
│  - lastName: String                                 │
│  - email: String (unique, indexed)                  │
│  - company: String (optional)                       │
│  - industry: String (enum)                          │
│  - password: String (hashed, select: false)         │
│  - agreedToTerms: Boolean                           │
│  - createdAt: Date                                  │
│  - updatedAt: Date                                  │
├─────────────────────────────────────────────────────┤
│  NEW FIELDS:                                        │
│  + resetPasswordToken: String (hashed, optional)    │
│  + resetPasswordExpire: Date (optional)             │
├─────────────────────────────────────────────────────┤
│  NEW METHODS:                                       │
│  + getResetPasswordToken(): String                  │
│    - Generates random token                         │
│    - Hashes and stores in resetPasswordToken        │
│    - Sets resetPasswordExpire to now + 10 min       │
│    - Returns unhashed token                         │
└─────────────────────────────────────────────────────┘
```

## API Request/Response Examples

### 1. Request Password Reset

**Request:**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

### 2. Verify Reset Token

**Request:**
```http
GET /api/auth/verify-reset-token/abc123xyz789
```

**Response (Valid):**
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

**Response (Invalid):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

### 3. Reset Password

**Request:**
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123xyz789",
  "password": "NewSecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "company": "Acme Corp",
    "industry": "pharmaceutical",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Error Scenarios

```
┌────────────────────────────────────────────────────────┐
│  Error Handling Matrix                                 │
├────────────────────────────────────────────────────────┤
│  Scenario                    │  User Experience        │
├──────────────────────────────┼─────────────────────────┤
│  Invalid email format        │  Inline error message   │
│  Email not in database       │  Generic success msg    │
│  Token expired (>10 min)     │  Error screen + retry   │
│  Token already used          │  Error screen + retry   │
│  Invalid token format        │  Error screen + retry   │
│  Password too short (<8)     │  Inline error + reqs    │
│  Passwords don't match       │  Inline error message   │
│  Network error               │  Generic error message  │
│  Server error (500)          │  Generic error message  │
└────────────────────────────────────────────────────────┘
```

---

This flow ensures a secure, user-friendly password reset experience! 🔒✨
