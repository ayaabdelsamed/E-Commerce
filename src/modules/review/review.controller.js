import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { reviewModel } from '../../../database/models/review.model.js'
import { deleteOne } from '../handlers/handlers.js'

const addReview = catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    let review = new reviewModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await review.save()
    res.json({message:"success",review})
})


const getAllReviews = catchError(async(req,res,next)=>{
    let reviews =await reviewModel.find()
    res.json({message:"success",reviews})
})


const getSingleReview = catchError(async(req,res,next)=>{
    let review =await reviewModel.findById(req.params.id)
    review || next(new AppError('review not found',404))
    !review || res.json({message:"success",review})
})

const updateReview = catchError(async(req,res,next)=>{
    let review =await reviewModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    review || next(new AppError('review not found',404))
    !review || res.json({message:"success",review})
})

const deleteReview = deleteOne(reviewModel)

export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}