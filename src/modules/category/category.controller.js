import { categoryModel } from "../../../database/models/category.model.js"
import slugify from 'slugify'
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"

const addCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = new categoryModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await category.save()
    res.json({message:"success",category})

})


const getAllCategories = catchError(async(req,res,next)=>{
    let categories =await categoryModel.find()
    res.json({message:"success",categories})
})


const getSingleCategory = catchError(async(req,res,next)=>{
    let category =await categoryModel.findById(req.params.id)
    category || next(new AppError('Category not found',404))
    !category || res.json({message:"success",category})
})

const updateCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category =await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError('Category not found',404))
    !category || res.json({message:"success",category})
})

const deleteCategory = catchError(async(req,res,next)=>{
    let category =await categoryModel.findByIdAndDelete(req.params.id)
    category || next(new AppError('Category not found',404))
    !category || res.json({message:"success",category})
})

export {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}