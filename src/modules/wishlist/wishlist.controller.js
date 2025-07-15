import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from '../../../database/models/user.model.js'

const addToWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findByIdAndUpdate(req.user.id,
        {$addToSet: {wishlist:req.body.product}},{new:true})

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

const removeFromWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findByIdAndUpdate(req.user.id,
        {$pull: {wishlist:req.params.id}},{new:true})

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

const getLoggedUserWishlist = catchError(async(req,res,next)=>{

    let wishlist =await userModel.findById(req.user.id).populate('wishlist')

    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success",wishlist: wishlist.wishlist})
})

export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}