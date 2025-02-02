import slugify from 'slugify'
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { brandModel } from '../../../database/models/brand.model.js'
import { deleteOne } from '../handlers/handlers.js'

const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new brandModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await brand.save()
    res.json({message:"success",brand})

})


const getAllBrands = catchError(async(req,res,next)=>{
    let brands =await brandModel.find()
    res.json({message:"success",brands})
})


const getSingleBrand = catchError(async(req,res,next)=>{
    let brand =await brandModel.findById(req.params.id)
    brand || next(new AppError('Brand not found',404))
    !brand || res.json({message:"success",brand})
})

const updateBrand = catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand =await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new AppError('Brand not found',404))
    !brand || res.json({message:"success",brand})
})

const deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}