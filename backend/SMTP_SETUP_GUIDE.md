# SMTP Email Configuration Guide

This guide will help you configure a real SMTP server to send password reset emails from your application.

## 📧 Overview

The email service now supports:
- **Real SMTP email sending** when configured
- **Automatic fallback** to simulation mode if SMTP is not configured
- **Multiple SMTP providers** (Gmail, SendGrid, AWS SES, custom servers)
- **Secure authentication** with environment variables

## 🚀 Quick Start

### 1. Choose Your SMTP Provider

Select one of the following options based on your needs:

#### Option A: Gmail (Free, Easy Setup)
✅ Best for: Development and testing
⚠️ Note: Requires Google App Password (not your regular password)

#### Option B: SendGrid (Free tier available)
✅ Best for: Production environments
✅ Features: 100 emails/day free, better deliverability

#### Option C: AWS SES (Pay-as-you-go)
✅ Best for: High-volume production
✅ Features: Very reliable, cost-effective at scale

#### Option D: Custom SMTP Server
✅ Best for: Self-hosted or corporate email servers

---

## 📝 Configuration Instructions

### Option A: Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security > 2-Step Verification
   - Enable 2-Step Verification if not already enabled

2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "SilicoInformatics" as the name
   - Click "Generate"
   - **Copy the 16-character password** (it won't be shown again)

3. **Update .env file**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # Your 16-character app password
   SMTP_FROM_EMAIL=your-email@gmail.com
   SMTP_FROM_NAME=SilicoInformatics
   ```

4. **Test the configuration**
   ```bash
   npm run dev
   ```

---

### Option B: SendGrid Setup

1. **Create SendGrid Account**
   - Sign up at: https://signup.sendgrid.com/
   - Free tier includes 100 emails/day

2. **Verify Sender Email**
   - Go to Settings > Sender Authentication
   - Verify a single sender email address
   - Check your email and click the verification link

3. **Create API Key**
   - Go to Settings > API Keys
   - Click "Create API Key"
   - Name it "SilicoInformatics"
   - Select "Full Access" or "Mail Send" permission
   - **Copy the API key** (it won't be shown again)

4. **Update .env file**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Your API key
   SMTP_FROM_EMAIL=your-verified-email@yourdomain.com
   SMTP_FROM_NAME=SilicoInformatics
   ```

---

### Option C: AWS SES Setup

1. **Create AWS Account**
   - Sign up at: https://aws.amazon.com/

2. **Set Up SES**
   - Go to AWS SES Console
   - Verify your email address or domain
   - Request production access (if needed)

3. **Create SMTP Credentials**
   - In SES Console, go to "SMTP Settings"
   - Click "Create SMTP Credentials"
   - Download the credentials

4. **Update .env file**
   ```env
   SMTP_HOST=email-smtp.us-east-1.amazonaws.com  # Use your region
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   SMTP_FROM_EMAIL=your-verified-email@yourdomain.com
   SMTP_FROM_NAME=SilicoInformatics
   ```

---

### Option D: Custom SMTP Server

1. **Get SMTP Details from Your Provider**
   - SMTP server hostname
   - Port (usually 587 or 465)
   - Username and password
   - Whether SSL/TLS is required

2. **Update .env file**
   ```env
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_SECURE=false  # Set to true for port 465
   SMTP_USER=your-email@yourdomain.com
   SMTP_PASS=your-password
   SMTP_FROM_EMAIL=noreply@yourdomain.com
   SMTP_FROM_NAME=SilicoInformatics
   ```

---

## 🧪 Testing Your Configuration

### 1. Restart Your Server
```bash
cd backend
npm run dev
```

### 2. Check Console Output
Look for these messages:
```
✅ SMTP Transporter initialized successfully
✅ SMTP Server is ready to send emails
```

If you see errors, check your credentials and configuration.

### 3. Test Password Reset
```bash
# Use the test script
./test-password-reset.sh

# Or manually test
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 4. Check Your Email
- Check your inbox for the password reset email
- Check spam folder if not received
- Verify the reset link works

---

## 🔧 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SMTP_HOST` | Yes | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | SMTP server port | `587` or `465` |
| `SMTP_SECURE` | No | Use SSL/TLS (true for 465) | `false` |
| `SMTP_USER` | Yes | SMTP username/email | `user@gmail.com` |
| `SMTP_PASS` | Yes | SMTP password/API key | `your-password` |
| `SMTP_FROM_EMAIL` | No | Sender email address | `noreply@domain.com` |
| `SMTP_FROM_NAME` | No | Sender display name | `SilicoInformatics` |

---

## 🐛 Troubleshooting

### Email Not Sending

1. **Check Console for Errors**
   - Look for SMTP connection errors in terminal
   - Verify all required environment variables are set

2. **Gmail Specific Issues**
   - Ensure 2FA is enabled
   - Use App Password, not your regular password
   - Check if "Less secure app access" needs to be enabled (not recommended)

3. **SendGrid Issues**
   - Verify your sender email address
   - Check API key permissions
   - Ensure API key hasn't expired

4. **Port/Firewall Issues**
   - Try port 465 with `SMTP_SECURE=true`
   - Check if your firewall blocks SMTP ports
   - Try from a different network

### Emails Going to Spam

1. **For Gmail**
   - Emails should arrive in inbox when sent from Gmail
   
2. **For Other Providers**
   - Set up SPF, DKIM, and DMARC records for your domain
   - Use a verified domain email address
   - Keep email content professional

### Testing in Development

If you don't want to configure real SMTP yet:
- The system automatically falls back to simulation mode
- Emails are logged to the console
- You can see the reset token and URL in the logs

---

## 🔒 Security Best Practices

1. **Never Commit Credentials**
   - `.env` file is in `.gitignore`
   - Never share your `.env` file
   - Use different credentials for dev/prod

2. **Use App Passwords**
   - For Gmail, always use App Passwords
   - Never use your main account password

3. **Rotate Keys Regularly**
   - Change API keys periodically
   - Revoke unused API keys

4. **Use Environment-Specific Configs**
   - Different SMTP for development/production
   - Consider using secrets management in production

---

## 📊 Email Service Features

The updated email service includes:

- ✅ Automatic SMTP detection and initialization
- ✅ Graceful fallback to simulation mode
- ✅ Connection verification on startup
- ✅ Professional HTML email templates
- ✅ Error handling and logging
- ✅ Support for multiple SMTP providers
- ✅ Configurable sender name and email
- ✅ 10-minute token expiration
- ✅ Responsive email design

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)

---

## 💡 Tips

1. **Start with Gmail** for quick testing and development
2. **Move to SendGrid** or AWS SES for production
3. **Monitor email sending** logs for debugging
4. **Test thoroughly** before deploying to production
5. **Set up email analytics** to track delivery rates

---

## 🆘 Need Help?

If you encounter issues:
1. Check the console logs for specific error messages
2. Verify all environment variables are set correctly
3. Test SMTP connection using online tools
4. Review your email provider's documentation

Happy emailing! 📧✨
