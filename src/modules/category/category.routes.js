import { Router } from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from './category.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validation.js'
import { addCategoryValidation } from './category.validation.js'

const categoryRouter = Router()

categoryRouter.route('/')
    .post(uploadSingleFile('image','categories'),validate(addCategoryValidation),addCategory)
    .get(getAllCategories)

categoryRouter.route('/:id')
    .get(getSingleCategory)
    .put(uploadSingleFile('image','categories'),updateCategory)
    .delete(deleteCategory)

export default categoryRouter