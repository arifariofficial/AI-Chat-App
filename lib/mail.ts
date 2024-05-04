import nodemailer from "nodemailer";

// SMTP settings for your email server
const transporter = nodemailer.createTransport({
  host: "email-smtp.eu-north-1.amazonaws.com", // SMTP server host
  port: 465, // SMTP port
  secure: true, // True if port is 465, otherwise false
  auth: {
    user: "AKIAT62YUAOUF4HND24U",
    pass: "BKdLIVeVVFxp9xYMT1IoUrCUS8doOYEesyu22OoBbQnd",
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
              <a href="${confirmLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Confirm your email</a>
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
              <a href="${resetLink}" style="background-color: #007BFF; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Reset your password</a>
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
