import { createRateLimiter } from "../utils/commonFunctions.js";

export const loginLimiter = createRateLimiter(
  10 * 60 * 1000, // 10 minutes
  5,              // max attempts
  "Too many login attempts. Please try again after 15 minutes."
);

export const signupLimiter = createRateLimiter(
  10 * 60 * 1000, // 10 minutes
  3,              // max 3 signups
  "Too many signup attempts. Please try again after 10 minutes."
);

export const forgotPassLimiter = createRateLimiter(
  10 * 60 * 1000,
  3,
  "Too many password reset requests. Please try again after 10 minutes.",
);

// Reset Password: 5 attempts / 10 minutes (optional)
export const resetPassLimiter = createRateLimiter(
  10 * 60 * 1000,
  5,
  "Too many reset attempts. Please try again later.",
);

// Verify Email: IP + email, 3 attempts / 10 minutes
export const verifyEmailLimiter = createRateLimiter(
  10 * 60 * 1000,
  3,
  "Too many verification requests. Please try again after 10 minutes.",
);
