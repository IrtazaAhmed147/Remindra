import express from 'express'
import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const assignmentsRouter = express.Router()


assignmentsRouter.post("/courses/:id/assignments", verifyToken, createAssignment);
assignmentsRouter.get("/courses/:id/assignments", verifyToken, getCourseAssignments);
assignmentsRouter.get("/:id", verifyToken, getAssignmentById);
assignmentsRouter.put("/:id", verifyToken, updateAssignment);
assignmentsRouter.post("/:id/submit", verifyToken, submitAssignment);


export {assignmentsRouter}
