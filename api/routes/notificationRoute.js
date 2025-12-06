import express from 'express'
import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const notificationRouter = express.Router()

notificationRouter.get("/users/:id/calendar", auth, getCalendarEvents);
notificationRouter.get("/users/:id/notifications", auth, getUserNotifications);
notificationRouter.put("/:id/read", auth, markNotificationRead);


export {notificationRouter}
