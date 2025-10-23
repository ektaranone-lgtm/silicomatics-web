# Password Reset Functionality Guide

## Overview

This guide documents the complete password reset functionality implemented for the SilicoInformatics application. The feature allows users to securely reset their passwords via email verification.

## Features

✅ **Request Password Reset**: Users can request a password reset by providing their email address  
✅ **Email Verification**: Reset tokens are sent via email (currently logged to console in development)  
✅ **Token Validation**: Tokens expire after 10 minutes for security  
✅ **Secure Password Reset**: Users can set a new password after token verification  
✅ **Password Strength Indicator**: Real-time feedback on password strength  
✅ **Auto-Login**: Users are automatically logged in after successful password reset  

## Architecture

### Backend Components

#### 1. User Model (`backend/src/models/User.ts`)
- Added `resetPasswordToken` field (hashed token)
- Added `resetPasswordExpire` field (expiry timestamp)
- New method: `getResetPasswordToken()` - Generates and hashes reset tokens

#### 2. Email Service (`backend/src/services/emailService.ts`)
- Sends formatted password reset emails
- In development: Logs email content to console
- In production: Integrate with SendGrid, AWS SES, or similar service
- Includes styled HTML email template

#### 3. Auth Controller (`backend/src/controllers/authController.ts`)
New endpoints:
- `forgotPassword` - Initiates password reset process
- `verifyResetToken` - Validates reset token
- `resetPassword` - Completes password reset

#### 4. Routes (`backend/src/routes/authRoutes.ts`)
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/verify-reset-token/:token` - Verify reset token
- `POST /api/auth/reset-password` - Reset password

### Frontend Components

#### 1. Forgot Password View (`silico-frontend/src/views/ForgotPasswordView.vue`)
- Email input form
- Validation and error handling
- Success confirmation message
- Integration with backend API

#### 2. Reset Password View (`silico-frontend/src/views/ResetPasswordView.vue`)
- Token verification on page load
- New password form with:
  - Password strength meter
  - Password requirements checklist
  - Confirm password field
  - Show/hide password toggles
- Success state with auto-redirect
- Invalid/expired token handling

#### 3. API Service (`silico-frontend/src/services/api.ts`)
New methods:
- `forgotPassword(email)` - Request password reset
- `verifyResetToken(token)` - Verify token validity
- `resetPassword({token, password})` - Submit new password

#### 4. Router (`silico-frontend/src/router/index.ts`)
- Added `/reset-password` route

## User Flow

### Step 1: Request Password Reset
1. User navigates to `/forgot-password`
2. Enters email address
3. Clicks "Send Reset Link"
4. Backend validates email exists
5. Generates reset token (expires in 10 minutes)
6. Sends email with reset link

### Step 2: Email Verification
1. User receives email with reset link
2. Link format: `http://localhost:5173/reset-password?token=XXXXX`
3. Email contains:
   - Prominent reset button
   - Manual link for backup
   - Expiry warning (10 minutes)
   - Security notice

### Step 3: Reset Password
1. User clicks link from email
2. Frontend verifies token validity
3. If valid: Shows password reset form
4. If invalid/expired: Shows error with option to request new link
5. User enters new password (must meet requirements)
6. Password strength indicator provides real-time feedback
7. User confirms password
8. Submits form

### Step 4: Completion
1. Backend validates token and updates password
2. Token is cleared from database
3. User receives auth token
4. Success message displayed
5. Auto-redirect to login page after 3 seconds

## Security Features

### Token Security
- Tokens are hashed before storage (using bcrypt)
- Tokens expire after 10 minutes
- One-time use only (cleared after successful reset)
- Random token generation (36-character strings)

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Real-time validation feedback

### Additional Security
- Rate limiting on all endpoints (100 requests per 15 minutes)
- Email enumeration protection (same response whether user exists or not)
- CORS protection
- Helmet security headers

## API Documentation

### Request Password Reset
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

### Verify Reset Token
```http
GET /api/auth/verify-reset-token/:token
```

**Response (Valid Token):**
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

**Response (Invalid/Expired Token):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123xyz789...",
  "password": "NewSecurePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password reset successful",
  "token": "jwt_auth_token...",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "company": "Company Name",
    "industry": "pharmaceutical",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Testing the Feature

### Development Mode

1. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd silico-frontend
   npm run dev
   ```

3. **Test the flow:**
   - Navigate to `http://localhost:5173/forgot-password`
   - Enter a registered email address
   - Check the backend console for the email content (includes reset link)
   - Copy the reset link from console logs
   - Paste into browser
   - Complete password reset process

### Console Email Output
In development mode, emails are logged to the backend console with this format:
```
============================================================
📧 Email Service - Email Details:
============================================================
To: user@example.com
Subject: Password Reset Request - SilicoInformatics
Content:
[HTML email template displayed here]
============================================================
✅ Email sent successfully (simulated)
```

## Production Setup

### Email Service Integration

To enable real email sending in production:

1. **Install email service package** (example with nodemailer):
   ```bash
   cd backend
   npm install nodemailer @types/nodemailer
   ```

2. **Configure email service** in `backend/src/services/emailService.ts`:
   ```typescript
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     service: 'gmail', // or 'sendgrid', 'ses', etc.
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASSWORD
     }
   });
   ```

3. **Update .env file:**
   ```bash
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@silicomatics.com
   ```

### Alternative Email Services

**SendGrid:**
```bash
npm install @sendgrid/mail
```

**AWS SES:**
```bash
npm install aws-sdk
```

**Mailgun:**
```bash
npm install mailgun-js
```

## Environment Variables

### Backend (.env)
```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration (for production)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@silicomatics.com
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-api-domain.com/api
```

## Customization

### Change Token Expiry Time
In `backend/src/models/User.ts`, modify the `getResetPasswordToken` method:
```typescript
// Current: 10 minutes
this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

// Change to 30 minutes:
this.resetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000);

// Change to 1 hour:
this.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000);
```

### Customize Email Template
Edit `backend/src/services/emailService.ts`, in the `sendPasswordResetEmail` method.

### Modify Password Requirements
Update validation in:
- Backend: `backend/src/routes/authRoutes.ts` (resetPasswordValidation)
- Frontend: `silico-frontend/src/views/ResetPasswordView.vue` (password-requirements)

## Troubleshooting

### Issue: Token not found or expired
**Solution:** 
- Check token hasn't expired (10 min default)
- Verify token is being passed correctly in URL
- Check backend MongoDB connection

### Issue: Email not sending
**Solution:**
- In development: Check backend console logs
- In production: Verify email service credentials
- Check email service rate limits

### Issue: Password validation errors
**Solution:**
- Ensure password meets all requirements
- Check password and confirm password match
- Verify minimum 8 character length

## Files Modified/Created

### Backend
- ✅ `src/models/User.ts` - Added reset token fields and methods
- ✨ `src/services/emailService.ts` - New email service
- ✅ `src/controllers/authController.ts` - Added reset password controllers
- ✅ `src/routes/authRoutes.ts` - Added reset password routes

### Frontend
- ✨ `src/views/ResetPasswordView.vue` - New password reset page
- ✅ `src/views/ForgotPasswordView.vue` - Connected to backend API
- ✅ `src/services/api.ts` - Added reset password API methods
- ✅ `src/router/index.ts` - Added reset password route

### Documentation
- ✨ `PASSWORD_RESET_GUIDE.md` - This guide

## Support

For issues or questions:
1. Check this documentation
2. Review console logs (backend and browser)
3. Verify environment variables are set correctly
4. Ensure MongoDB is running and connected

## Future Enhancements

Potential improvements:
- SMS-based password reset option
- Multi-factor authentication
- Password history (prevent reusing old passwords)
- Account lockout after multiple failed attempts
- Security notification emails
- Admin dashboard for reset analytics
