import { Router } from 'express'
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory } from './subcategory.controller.js'

const subCategoryRouter = Router()
subCategoryRouter.route('/')
    .post(addSubCategory)
    .get(getAllSubCategories)

    subCategoryRouter.route('/:id')
    .get(getSingleSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory)

export default subCategoryRouter