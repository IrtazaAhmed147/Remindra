import express from 'express'
import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const resourceRouter = express.Router()

resourceRouter.post("/courses/:id/resources", verifyToken, uploadResource);
resourceRouter.get("/courses/:id/resources", verifyToken, getCourseResources);
resourceRouter.get("/:id", getResourceById);
resourceRouter.put("/:id", verifyToken, updateResource);


export {resourceRouter}
