import express from 'express'
import { signin, signup } from './auth.controller.js'
import { checkEmail } from '../../middleware/checkEmail.js'

const authRouter=express.Router()

authRouter.post('/signup',checkEmail,signup)
authRouter.post('/signin',signin)
//authRouter.get('/verify/:token',verify)

export default authRouter