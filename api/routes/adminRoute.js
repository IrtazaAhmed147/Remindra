import express from 'express'
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js'
import { getAllStats, sendEmailToUser } from '../controllers/adminController.js';

const adminRouter = express.Router()



// adminRouter.put("/suspend-user/:id", verifyAdmin, suspendUser);
// adminRouter.put("/disable-course/:id", verifyAdmin,  disableCourse);
adminRouter.get("/stats/all",verifyAdmin,  getAllStats)
adminRouter.post("/send-email",verifyAdmin, sendEmailToUser);


export {adminRouter}
