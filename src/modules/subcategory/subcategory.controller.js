
import slugify from 'slugify'
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { subCategoryModel } from '../../../database/models/subcategory.model.js'

const addSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new subCategoryModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await subCategory.save()
    res.json({message:"success",subCategory})

})


const getAllSubCategories = catchError(async(req,res,next)=>{
    let subCategories =await subCategoryModel.find()
    res.json({message:"success",subCategories})
})


const getSingleSubCategory = catchError(async(req,res,next)=>{
    let subCategory =await subCategoryModel.findById(req.params.id)
    subCategory || next(new AppError('subCategory not found',404))
    !subCategory || res.json({message:"success",subCategory})
})

const updateSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory =await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subCategory || next(new AppError('subCategory not found',404))
    !subCategory || res.json({message:"success",subCategory})
})

const deleteSubCategory = catchError(async(req,res,next)=>{
    let subCategory =await subCategoryModel.findByIdAndDelete(req.params.id)
    subCategory || next(new AppError('subCategory not found',404))
    !subCategory || res.json({message:"success",subCategory})
})

export {
    addSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory
}