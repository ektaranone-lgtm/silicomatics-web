/**
 * SMTP Configuration Test Script
 * 
 * This script helps you verify your SMTP configuration is working correctly.
 * 
 * Usage:
 *   npx ts-node test-smtp.ts your-email@example.com
 */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

async function testSMTPConfiguration(testEmail: string) {
  console.log('🔍 SMTP Configuration Test\n');
  console.log('='.repeat(60));

  // Check if SMTP is configured
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease configure these variables in your .env file.');
    console.error('See SMTP_SETUP_GUIDE.md for instructions.\n');
    process.exit(1);
  }

  // Display configuration (hide password)
  console.log('📋 Current SMTP Configuration:\n');
  console.log(`   Host:      ${process.env.SMTP_HOST}`);
  console.log(`   Port:      ${process.env.SMTP_PORT}`);
  console.log(`   Secure:    ${process.env.SMTP_SECURE || 'false'}`);
  console.log(`   User:      ${process.env.SMTP_USER}`);
  console.log(`   Password:  ${'*'.repeat(16)} (hidden)`);
  console.log(`   From:      ${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}`);
  console.log(`   Name:      ${process.env.SMTP_FROM_NAME || 'SilicoInformatics'}\n`);
  console.log('='.repeat(60));

  try {
    // Create transporter
    console.log('\n🔌 Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection
    console.log('🔐 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Send test email
    console.log(`📧 Sending test email to: ${testEmail}`);
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'SilicoInformatics'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: testEmail,
      subject: 'SMTP Configuration Test - SilicoInformatics',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .success {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                border-radius: 5px;
                padding: 20px;
                margin: 20px 0;
              }
              .success h2 {
                color: #155724;
                margin-top: 0;
              }
              .info {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
              }
              code {
                background: #e9ecef;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
              }
            </style>
          </head>
          <body>
            <div class="success">
              <h2>✅ SMTP Configuration Test Successful!</h2>
              <p>Your SMTP server is properly configured and working correctly.</p>
            </div>
            
            <div class="info">
              <h3>📋 Configuration Details:</h3>
              <ul>
                <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
                <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</li>
                <li><strong>From Address:</strong> ${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}</li>
                <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
              </ul>
            </div>
            
            <h3>🎉 What's Next?</h3>
            <p>Your email service is now ready to send password reset emails. You can:</p>
            <ol>
              <li>Test the forgot password flow in your application</li>
              <li>Deploy your application with confidence</li>
              <li>Monitor email sending in the console logs</li>
            </ol>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This is an automated test email from SilicoInformatics.
            </p>
          </body>
        </html>
      `,
    });

    console.log('✅ Test email sent successfully!\n');
    console.log('='.repeat(60));
    console.log('📨 Email Details:\n');
    console.log(`   Message ID:  ${info.messageId}`);
    console.log(`   Accepted:    ${info.accepted?.join(', ') || 'N/A'}`);
    console.log(`   Rejected:    ${info.rejected?.length > 0 ? info.rejected.join(', ') : 'None'}`);
    console.log(`   Response:    ${info.response}`);
    console.log('='.repeat(60));
    console.log('\n✨ Check your inbox! The test email should arrive shortly.\n');

  } catch (error) {
    console.error('\n❌ SMTP Test Failed!\n');
    console.error('Error details:');
    console.error(error);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Verify your SMTP credentials are correct');
    console.error('   2. Check if your email provider requires App Password (Gmail)');
    console.error('   3. Ensure the SMTP port is not blocked by your firewall');
    console.error('   4. Review SMTP_SETUP_GUIDE.md for detailed instructions\n');
    process.exit(1);
  }
}

// Get test email from command line argument
const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Please provide a test email address\n');
  console.error('Usage:');
  console.error('   npx ts-node test-smtp.ts your-email@example.com\n');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(testEmail)) {
  console.error('❌ Invalid email address format\n');
  process.exit(1);
}

// Run the test
testSMTPConfiguration(testEmail);
