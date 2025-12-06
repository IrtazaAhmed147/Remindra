import express from 'express'
import {  createCourse, } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const courseRouter = express.Router()


courseRouter.post("/create", verifyToken, createCourse);
// courseRouter.get("/", verifyToken, getUserCourses);
// courseRouter.get("/all", getAllCourses);
// courseRouter.get("/:id", verifyToken,getCourseById);
// courseRouter.put("/:id", verifyToken, updateCourse);
// courseRouter.delete("/:id", verifyToken, deleteCourse);


export {courseRouter}
