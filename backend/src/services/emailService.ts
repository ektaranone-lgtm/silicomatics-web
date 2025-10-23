// Email service for sending password reset emails
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: Transporter | null = null;
  private useRealSMTP: boolean;

  constructor() {
    // Check if SMTP is configured
    this.useRealSMTP = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    );

    if (this.useRealSMTP) {
      this.initializeTransporter();
    } else {
      console.log('⚠️  SMTP not configured. Running in simulation mode.');
      console.log('   Configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env to send real emails.');
    }
  }

  private initializeTransporter(): void {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      console.log('✅ SMTP Transporter initialized successfully');
      
      // Verify connection configuration
      this.transporter.verify((error) => {
        if (error) {
          console.error('❌ SMTP Connection Error:', error);
        } else {
          console.log('✅ SMTP Server is ready to send emails');
        }
      });
    } catch (error) {
      console.error('❌ Failed to initialize SMTP transporter:', error);
      this.useRealSMTP = false;
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.useRealSMTP || !this.transporter) {
      // Fallback to simulation mode
      console.log('='.repeat(60));
      console.log('📧 Email Service - Simulation Mode');
      console.log('='.repeat(60));
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log('Content:');
      console.log(options.html);
      console.log('='.repeat(60));
      console.log('✅ Email logged (simulated - configure SMTP to send real emails)');
      return true;
    }

    try {
      // Send real email via SMTP
      const info = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || 'SilicoInformatics'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      console.log('✅ Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string, userName: string): Promise<boolean> {
    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #333;
              font-size: 22px;
              margin-top: 0;
            }
            .content p {
              margin: 15px 0;
              color: #666;
            }
            .button-container {
              text-align: center;
              margin: 35px 0;
            }
            .reset-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: 600;
              font-size: 16px;
            }
            .reset-button:hover {
              opacity: 0.9;
            }
            .token-box {
              background: #f8f9fa;
              border: 1px solid #e0e0e0;
              border-radius: 5px;
              padding: 15px;
              margin: 20px 0;
              word-break: break-all;
              font-family: 'Courier New', monospace;
              font-size: 14px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 13px;
              color: #666;
              border-top: 1px solid #e0e0e0;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 5px;
              padding: 15px;
              margin: 20px 0;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName}!</h2>
              <p>We received a request to reset your password for your SilicoInformatics account.</p>
              <p>Click the button below to reset your password:</p>
              
              <div class="button-container">
                <a href="${resetUrl}" class="reset-button">Reset Password</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <div class="token-box">
                ${resetUrl}
              </div>
              
              <div class="warning">
                ⚠️ <strong>Important:</strong> This link will expire in <strong>10 minutes</strong> for security reasons.
              </div>
              
              <p><strong>If you didn't request this password reset</strong>, you can safely ignore this email. Your password will not be changed.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} SilicoInformatics. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Password Reset Request - SilicoInformatics',
      html
    });
  }
}

export default new EmailService();
