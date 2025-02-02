import slugify from 'slugify'
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from '../../../database/models/user.model.js'
import { deleteOne } from '../handlers/handlers.js'

const addUser = catchError(async(req,res,next)=>{

    let user = new userModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await user.save()
    res.json({message:"success",user})

})


const getAllUsers = catchError(async(req,res,next)=>{
    let users =await userModel.find()
    res.json({message:"success",users})
})


const getSingleUser = catchError(async(req,res,next)=>{
    let user =await userModel.findById(req.params.id)
    user || next(new AppError('user not found',404))
    !user || res.json({message:"success",user})
})

const updateUser = catchError(async(req,res,next)=>{

    let user =await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user || next(new AppError('user not found',404))
    !user || res.json({message:"success",user})
})

const deleteUser = deleteOne(userModel)

export {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}