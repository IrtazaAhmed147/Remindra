import express from 'express'
import {  adminLogin, forgotPassword, login, logout, register, resetPass, verifyEmail } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { forgotPassLimiter, loginLimiter, resetPassLimiter, signupLimiter, verifyEmailLimiter } from '../middleware/authRateLimiters.js'

const authRouter = express.Router()



authRouter.post('/signup', signupLimiter,register)
authRouter.post('/login', loginLimiter,login)
authRouter.post('/admin-login',adminLogin)
authRouter.post('/forgotPassword', forgotPassLimiter,forgotPassword)
authRouter.post('/resetPassword',resetPassLimiter, resetPass)
authRouter.get('/logout', logout)
authRouter.post('/verifyEmail',verifyEmailLimiter, verifyEmail)
 
export {authRouter}