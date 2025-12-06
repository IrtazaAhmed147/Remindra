import express from 'express'
import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const quizRouter = express.Router()


quizRouter.post("/courses/:id/quiz", verifyToken, createQuiz);
quizRouter.get("/courses/:id/quiz", verifyToken, getCourseQuizs);
quizRouter.get("/:id", verifyToken, getQuizById);
quizRouter.put("/:id", verifyToken, updateQuiz);
quizRouter.post("/:id/submit", verifyToken, submitQuiz);


export {quizRouter}
