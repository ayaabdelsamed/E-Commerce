import { categoryModel } from "../../../database/models/category.model.js"
import slugify from 'slugify'

const addCategory = async(req,res,next)=>{

    req.body.slug = slugify(req.body.name)
    let category = new categoryModel(req.body) // بيرجع الكودل قبل ما يتسيف
    console.log(category);
    await category.save()

    res.json({message:"success",category})

}

export {
    addCategory
}