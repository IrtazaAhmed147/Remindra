import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import multer from 'multer';
// import { createAssignments, deleteAssignment, getAllAssignments, getSingleAssignment, getUserAssignments, updateAssignment } from '../controllers/assignmentsController.js';
import { createQuizs, deleteQuiz, getAllQuizs, getSingleQuiz, getUserQuizs, updateQuiz } from '../controllers/quizController.js';
import { createQuizLimiter, deleteQuizLimiter, updateQuizLimiter } from '../middleware/quizRateLimiters.js';

const quizRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

quizRouter.post("/create/course/:id", verifyToken,createQuizLimiter,upload.array('attachments'), createQuizs);
quizRouter.get("/all", verifyToken,getAllQuizs);
quizRouter.get("/:id", verifyToken, getSingleQuiz);
quizRouter.get("/", verifyToken, getUserQuizs);
quizRouter.put("/:id", verifyToken,updateQuizLimiter, upload.array('attachments'),updateQuiz);
quizRouter.delete("/:id/course/:courseId", verifyToken, deleteQuizLimiter,deleteQuiz);



export {quizRouter}
