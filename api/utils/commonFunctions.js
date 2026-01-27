import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pkg from 'jsonwebtoken';
import rateLimit from "express-rate-limit"


dotenv.config();

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};




export const generateForgotPassEmail = async (mail, link) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: mail,
    subject: 'Forgot Password',
    html: ` <h2 style="color:#1f2937;">Password Reset Request</h2>

  <p style="color:#374151;">Hello,</p>

  <p style="color:#374151;">
    We received a request to reset the password for your <strong>Remindra</strong> account.
  </p>

  <p style="color:#374151;">
    Click the button below to reset your password. This link will expire in
    <strong>10 minutes</strong>.
  </p>

  <a href="${link}" style="
    display: inline-block;
    padding: 12px 24px;
    background-color: #4F8DFF;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    margin: 16px 0;
  ">
    Reset Password
  </a>

  <p style="color:#374151;">
    If you did not request a password reset, please ignore this email.
  </p>

  <p style="color:#374151; margin-top: 24px;">
    Regards,<br/>
    <strong>Remindra Team</strong>
  </p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to ${mail} via email`;
  } catch (error) {
    throw `Error sending OTP to ${mail} via email: ${error}`;
  }
}

export const generateEmail = async (mail, otp) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: mail,
    subject: 'OTP Verification',
    html: `<h2 style="color:#1f2937;">OTP Verification</h2>

<p style="color:#374151;">Hello,</p>

<p style="color:#374151;">
  Use the following One-Time Password (OTP) to verify your <strong>Remindra</strong> account:
</p>

<h1 style="color:#4F8DFF; letter-spacing: 4px;">
  ${otp}
</h1>

<p style="color:#374151;">
  This OTP is valid for <strong>10 minutes</strong>. For security reasons, please do not share it with anyone.
</p>

<p style="color:#374151; margin-top: 24px;">
  Regards,<br/>
  <strong>Remindra Team</strong>
</p>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to ${mail} via email`;
  } catch (error) {
    throw `Error sending OTP to ${mail} via email: ${error}`;
  }
}




const { sign, verify } = pkg;

// const jwtSecretKey = "123456";

export const GenerateToken = ({ data, expiresIn }) => {
  //make the key more harder
  //expires in should also be from .env file
  //good approach
  return sign({ result: data }, process.env.JWT, {
    expiresIn: expiresIn
  })
};

export const VerifyEmailToken = (token) => {
  return verify(token, process.env.JWT);
};

// Generic rate limiter function

export const createRateLimiter = (windowMs, maxRequests, message) => {
  return rateLimit({
      windowMs: windowMs,       // Time window in milliseconds
      max: maxRequests,         // Maximum number of requests allowed
      message: {
          status: false,
          message: message,
          data: null
      },
      standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false      // Disable the `X-RateLimit-*` headers
  });
};