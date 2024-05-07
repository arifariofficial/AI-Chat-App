import nodemailer from "nodemailer";

// SMTP settings for your email server
/* const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sipeai6@gmail.com",
    pass: "jslg uyyo mopu rymt",
  },
}); */

// Create the transporter to use your own mail server
const transporter = nodemailer.createTransport({
  host: "127.0.0.1", // or the IP address of your mail server
  port: 587, // Adjust if your server uses a different port (587 for STARTTLS or 465 for SSL)
  secure: false, // True for port 465 (SSL), false for other ports
  auth: {
    user: "your-username", // Your mail server username
    pass: "your-password", // Your mail server password
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseURL}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: '"SIPE" <sipeai6@gmail.com>',
    to: email,
    subject: "Confirm your email",
    html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; padding: 40px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Welcome to Our Service!</h2>
              <p style="color: #555; font-size: 16px; margin-bottom: 30px;">Please confirm your email by clicking the button below:</p>
              <a href="${confirmLink}" style="background-color: #4F6E70; color: #F5EFD1; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Confirm your email</a>
              <p style="color: #555; font-size: 16px; margin-top: 30px;">Thank you for joining us!</p>
            </div>
          </div>
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseURL}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"SIPE" <sipeai6@gmail.com>',
    to: email,
    subject: "Reset your password",
    html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; padding: 40px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
              <p style="color: #555; font-size: 16px; margin-bottom: 30px;">You're receiving this email because you requested a password reset for your account. Please click the button below to reset your password:</p>
              <a href="${resetLink}" style="background-color: #4F6E70; color: #F5EFD1; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Reset your password</a>
              <p style="color: #555; font-size: 16px; margin-top: 30px;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
              <p style="color: #777; font-size: 14px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">If you're having trouble clicking the "Reset your password" button, copy and paste the URL below into your web browser:</p>
              <a href="${resetLink}" style="color: #007BFF; text-decoration: none; word-break: break-all;">${resetLink}</a>
            </div>
          </div>
        `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: '"SIPE" <sipeai6@gmail.com>',
    to: email,
    subject: "2FA Code",
    html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; padding: 40px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Your Two-Factor Authentication Code</h2>
              <p style="font-size: 24px; color: #007BFF; margin: 20px;">${token}</p>
              <p style="color: #555; font-size: 16px;">Enter this code to complete your sign-in process.</p>
            </div>
          </div>
        `,
  });
};
