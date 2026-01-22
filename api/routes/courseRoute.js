import express from 'express'
import { createCourse, deletecourse, disableCourse, downloadCourseImages, getAllcourses, getSinglecourse, getUserCourses, suspendCourse, updatecourse, } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const courseRouter = express.Router()


courseRouter.post("/create", verifyToken, createCourse);
courseRouter.get("/", verifyToken, getUserCourses);
courseRouter.get("/all", verifyToken, getAllcourses);
courseRouter.get("/:id", verifyToken, getSinglecourse);
courseRouter.put("/:id", verifyToken, updatecourse);
courseRouter.put("/suspend/:id", verifyToken, suspendCourse);
courseRouter.put("/disable/:id", verifyToken, disableCourse);
courseRouter.delete("/:id", verifyToken, deletecourse);
courseRouter.post(
  "/resources/download/:id",
  verifyToken,
  downloadCourseImages
);


export { courseRouter }
