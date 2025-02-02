import { Router } from 'express'
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from './user.controller.js'
import { checkEmail } from '../../middleware/checkEmail.js'
const userRouter = Router()

userRouter.route('/')
    .post(checkEmail,addUser)
    .get(getAllUsers)

userRouter.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

export default userRouter


