import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { couponModel } from '../../../database/models/coupon.model.js'
import { deleteOne } from '../handlers/handlers.js'

const addCoupon = catchError(async(req,res,next)=>{
    let isExist = await couponModel.findOne({code:req.body.code})
    if(isExist) return next(new AppError('Coupon exist',409))
    let coupon = new couponModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await coupon.save()
    res.json({message:"success",coupon})
})


const getAllCoupons = catchError(async(req,res,next)=>{
    let coupons =await couponModel.find()
    res.json({message:"success",coupons})
})


const getSingleCoupon = catchError(async(req,res,next)=>{
    let coupon =await couponModel.findById(req.params.id)
    coupon || next(new AppError('coupon not found',404))
    !coupon || res.json({message:"success",coupon})
})

const updateCoupon = catchError(async(req,res,next)=>{
    let coupon =await couponModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new AppError('coupon not found',404))
    !coupon || res.json({message:"success",coupon})
})

const deleteCoupon = deleteOne(couponModel)

export {
    addCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon
}