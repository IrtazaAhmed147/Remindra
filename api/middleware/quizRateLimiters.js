import { createRateLimiter } from "../utils/commonFunctions.js";

// Create quiz: 10 per hour per user
export const createQuizLimiter = createRateLimiter(
  30 * 60 * 1000,
  10,
  "Too many quiz creation requests. Try again after 30min.",
);

// Update quiz: 10 per hour per user
export const updateQuizLimiter = createRateLimiter(
  30 * 60 * 1000,
  10,
  "Too many quiz updates. Try again after 30min.",
);

// Delete quiz: 5 per hour per user
export const deleteQuizLimiter = createRateLimiter(
  10 * 60 * 1000,
  5,
  "Too many quiz deletions. Try again after 10min.",
);
