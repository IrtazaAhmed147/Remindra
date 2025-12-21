import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { dashboardStats } from '../controllers/dashboardController.js';



const dashboardRouter = express.Router()

dashboardRouter.get("/stats", verifyToken, dashboardStats);


export { dashboardRouter }
