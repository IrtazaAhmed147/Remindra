import express from 'express'
import { createCourse, deletecourse, downloadCourseImages, getAllcourses, getSinglecourse, getUserCourses, updatecourse, } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const courseRouter = express.Router()


courseRouter.post("/create", verifyToken, createCourse);
courseRouter.get("/", verifyToken, getUserCourses);
courseRouter.get("/all", verifyToken, getAllcourses);
courseRouter.get("/:id", verifyToken, getSinglecourse);
courseRouter.put("/:id", verifyToken, updatecourse);
courseRouter.delete("/:id", verifyToken, deletecourse);
courseRouter.get(
  "/resources/download/:id",
  verifyToken,
  downloadCourseImages
);


export { courseRouter }
