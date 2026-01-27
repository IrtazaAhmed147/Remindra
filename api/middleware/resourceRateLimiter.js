import { createRateLimiter } from "../utils/commonFunctions.js";

// Upload resource: 10 per hour per user
export const uploadResourceLimiter = createRateLimiter(
  40 * 60 * 1000,
  10,
  "Too many resource uploads. Try again after 40 mins.",
);

// Delete single resource: 5 per hour per user
export const deleteResourceLimiter = createRateLimiter(
  30 * 60 * 1000,
  5,
  "Too many resource deletions. Try again after 30 min.",
);

// Delete all resources of a course: 3 per hour per user
export const deleteAllResourceLimiter = createRateLimiter(
  60 * 60 * 1000,
  3,
  "Too many resource deletions. Try again after 1 hour.",
);
