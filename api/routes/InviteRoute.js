import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllInvitations, getUserInvitations, sendInvite, updateInvite } from '../controllers/courseInviteController.js';

const inviteRouter = express.Router()

inviteRouter.post("/send/course/:courseId", verifyToken, sendInvite);
inviteRouter.get("/all", verifyToken, getAllInvitations);
inviteRouter.get("/", verifyToken, getUserInvitations);
inviteRouter.put("/:id", verifyToken, updateInvite);


export { inviteRouter }
