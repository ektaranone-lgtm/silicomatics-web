# Password Reset - Quick Start Guide

## 🚀 Quick Setup (2 minutes)

### Prerequisites
- MongoDB running
- Backend server running on port 5000
- Frontend server running on port 5173

### Step 1: Start the servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd silico-frontend
npm run dev
```

### Step 2: Test the feature

1. **Go to Forgot Password Page:**
   - Open browser: `http://localhost:5173/forgot-password`

2. **Enter a registered email:**
   - Use an email from an existing user in your database
   - Click "Send Reset Link"

3. **Check Backend Console:**
   - Look for the email output in the backend terminal
   - You'll see something like this:
   ```
   ============================================================
   📧 Email Service - Email Details:
   ============================================================
   To: user@example.com
   Subject: Password Reset Request - SilicoInformatics
   Content:
   [HTML email with reset link]
   http://localhost:5173/reset-password?token=abc123xyz789...
   ============================================================
   ```

4. **Copy the Reset Link:**
   - Copy the entire URL that starts with `http://localhost:5173/reset-password?token=`

5. **Open Reset Link:**
   - Paste into browser
   - You should see the "Create New Password" page

6. **Reset Password:**
   - Enter new password (min 8 chars, must include uppercase, lowercase, number)
   - Confirm password
   - Click "Reset Password"
   - You'll see a success message and be redirected to login

7. **Test Login:**
   - Try logging in with your new password
   - Should work! ✅

## 🧪 Automated Testing

Want to test via command line? Run the test script:

```bash
cd backend
./test-password-reset.sh
```

Follow the prompts to test the complete flow.

## 📝 Key Points

- **Token Expiry:** Reset tokens expire in 10 minutes
- **One-time Use:** Each token can only be used once
- **Security:** Tokens are hashed in the database
- **Email:** Currently logs to console (configure email service for production)

## 🔗 Useful Routes

- Forgot Password: `http://localhost:5173/forgot-password`
- Reset Password: `http://localhost:5173/reset-password?token=YOUR_TOKEN`
- Login: `http://localhost:5173/login`

## 📚 Need More Info?

See `PASSWORD_RESET_GUIDE.md` for complete documentation.

## ⚠️ Troubleshooting

**Problem:** "Invalid or expired reset token"  
**Solution:** Token expired (10 min limit) or already used. Request a new one.

**Problem:** Email not showing in console  
**Solution:** Check backend is running and MongoDB is connected.

**Problem:** Password validation errors  
**Solution:** Ensure password has:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number

## 🎯 What Was Implemented

✅ Backend API endpoints for password reset  
✅ Email service (console logging in dev mode)  
✅ Token generation and validation  
✅ Secure password reset flow  
✅ Beautiful password reset UI  
✅ Password strength indicator  
✅ Auto-login after reset  
✅ Token expiry (10 minutes)  
✅ Comprehensive error handling  

Enjoy your new password reset feature! 🎉
