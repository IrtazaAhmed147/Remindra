import express from 'express'
import { createCourse, deletecourse, deletecourseMembers, disableCourse, downloadCourseImages, getAllcourses, getSinglecourse, getUserCourses, suspendCourse, updatecourse, } from '../controllers/courseController.js'
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js'
import { createCourseLimiter, updateCourseLimiter } from '../middleware/courseRateLimiters.js';

const courseRouter = express.Router()


courseRouter.post("/create", verifyToken, createCourseLimiter, createCourse);
courseRouter.get("/", verifyToken, getUserCourses);
courseRouter.get("/all", verifyToken, getAllcourses);
courseRouter.get("/:id", verifyToken, getSinglecourse);
courseRouter.put("/:id", verifyToken, updateCourseLimiter, updatecourse);
courseRouter.put("/suspend/:id", verifyToken,verifyAdmin, suspendCourse);
courseRouter.put("/disable/:id", verifyToken, disableCourse);
courseRouter.delete("/:id", verifyToken, deletecourse);
courseRouter.put("/members/:id", verifyToken, deletecourseMembers);
courseRouter.post(
  "/resources/download/:id",
  verifyToken,
  downloadCourseImages
);


export { courseRouter }
