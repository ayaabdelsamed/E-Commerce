import slugify from 'slugify'
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { productModel } from '../../../database/models/product.model.js'

const addProduct = catchError(async(req,res,next)=>{
    console.log(req.files);
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename    
    req.body.images = req.files.images.map(img=>img.filename)   
    let product = new productModel(req.body) // بيرجع الكودل قبل ما يتسيف
    await product.save()
    res.json({message:"success",product})

})


const getAllProducts = catchError(async(req,res,next)=>{
    let products =await productModel.find()
    res.json({message:"success",products})
})


const getSingleProduct = catchError(async(req,res,next)=>{
    let product =await productModel.findById(req.params.id)
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
})

const updateProduct = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    let product =await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
})

const deleteProduct = catchError(async(req,res,next)=>{
    let product =await productModel.findByIdAndDelete(req.params.id)
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
})

export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}