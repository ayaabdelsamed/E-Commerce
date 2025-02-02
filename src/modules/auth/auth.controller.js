import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { userModel } from "../../../database/models/user.model.js"


const signup =catchError(async(req,res,next)=>{
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id,email:user.email},'aykey')
    res.json({message:"success",token})
     
})


const signin =catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
       // if(user.verifyEmail)
        return res.json({message:"success",token})
        // else  
        //     return next(new AppError("verify email first",401))
    }
    //return res.json({message:"incorrect mail or password"})
    next(new AppError("incorrect mail or password",401))
})

const changeUserPassword =catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})

    if(user&&bcrypt.compareSync(req.body.oldPassword,user.password)){
        
        await userModel.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword})
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
       // if(user.verifyEmail)
        return res.json({message:"success",token})
        // else  
        //     return next(new AppError("verify email first",401))
    }
    //return res.json({message:"incorrect mail or password"})
    next(new AppError("incorrect mail or password",401))
})


// const verify = catchError(async(req,res,next)=>{
//     jwt.verify(req.params.token,process.env.JWT_KEY,async(err,decoded)=>{
//         if(err) return next(new AppError(err,401))
//             await userModel.findOneAndUpdate({email:decoded.email},{verifyEmail:true})
//             res.json({message:"success"})

//     })

// })

export{
    signup,
    signin,
    changeUserPassword
}
