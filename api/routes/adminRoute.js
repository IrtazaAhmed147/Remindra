import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'

const adminRouter = express.Router()



adminRouter.put("/suspend-user/:id", verifyToken, isAdmin, suspendUser);
adminRouter.put("/disable-course/:id", verifyToken, isAdmin, disableCourse);


export {adminRouter}
