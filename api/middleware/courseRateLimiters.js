import { createRateLimiter } from "../utils/commonFunctions.js";

// Create course: limit 5 per hour per user
export const createCourseLimiter = createRateLimiter(
  30 * 60 * 1000, // 1 hour
  5,
  "Too many course creation requests. Please try again after 30min.",
);



// Update course: 10 requests / 1 hour per user
export const updateCourseLimiter = createRateLimiter(
  30 * 60 * 1000,
  10,
  "Too many course updates. Please try again after 30min.",
);



