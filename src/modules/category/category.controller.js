import { categoryModel } from "../../../database/models/category.model.js"
import slugify from 'slugify'

const addCategory = async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = new categoryModel(req.body) // بيرجع الكودل قبل ما يتسيف
    console.log(category);
    await category.save()
    res.json({message:"success",category})

}

const getAllCategories = async(req,res,next)=>{
    let categories =await categoryModel.find({})
    res.json({message:"success",categories})
}

const getSingleCategory = async(req,res,next)=>{
    let category =await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message:"Category not found"})
    category && res.json({message:"success",category})
}

const updateCategory = async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category =await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    //if(!category) return res.status(404).json({message:"Category not found"})
    !category && res.status(404).json({message:"Category not found"})
    category && res.json({message:"success",category})
}

const deleteCategory = async(req,res,next)=>{
    let category =await categoryModel.findByIdAndDelete(req.params.id)
    !category && res.status(404).json({message:"Category not found"})
    category && res.json({message:"success",category})
}

export {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}