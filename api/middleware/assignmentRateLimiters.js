import { createRateLimiter } from "../utils/commonFunctions.js";

// Create assignment: 10 per hour per user
export const createAssignmentLimiter = createRateLimiter(
  30 * 60 * 1000,
  10,
  "Too many assignment creation requests. Try again after 30min.",
);

// Update assignment: 10 per hour per user
export const updateAssignmentLimiter = createRateLimiter(
  30 * 60 * 1000,
  10,
  "Too many assignment updates. Try again after 30min.",
);

// Delete assignment: 5 per hour per user
export const deleteAssignmentLimiter = createRateLimiter(
  10 * 60 * 1000,
  5,
  "Too many assignment deletions. Try again after 10min.",
);
