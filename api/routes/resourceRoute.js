import express from 'express'
// import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js'
import { deleteAllResource, deleteResource, getAllResources, getCourseResources, getSingleResource, uploadResource } from '../controllers/resourceController.js';
import multer from 'multer';
import { deleteAllResourceLimiter, deleteResourceLimiter, uploadResourceLimiter } from '../middleware/resourceRateLimiter.js';

const resourceRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage,    limits: { fileSize: 10 * 1024 * 1024 },  })

resourceRouter.post("/course/:id/", verifyToken,uploadResourceLimiter,upload.array('materials',20), uploadResource);
resourceRouter.get("/all", verifyToken,verifyAdmin, getAllResources);
resourceRouter.get("/courses/:id/", verifyToken, getCourseResources);
resourceRouter.get("/:id", getSingleResource);
resourceRouter.delete("/selected-delete", verifyToken,deleteResourceLimiter, deleteResource);
resourceRouter.delete("/course/:courseId", verifyToken,deleteAllResourceLimiter, deleteAllResource);
// resourceRouter.put("/:id", verifyToken, updateResource);


export {resourceRouter}
