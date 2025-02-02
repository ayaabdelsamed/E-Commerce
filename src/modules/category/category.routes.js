import { Router } from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from './category.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validation.js'
import { addCategoryValidation } from './category.validation.js'
import subCategoryRouter from '../subcategory/subcategory.routes.js'
import { protectedRoutes } from '../auth/auth.controller.js'

const categoryRouter = Router()

categoryRouter.use('/:id/subcategories',subCategoryRouter)
categoryRouter.route('/')
    .post(protectedRoutes,uploadSingleFile('image','categories'),validate(addCategoryValidation),addCategory)
    .get(getAllCategories)

categoryRouter.route('/:id')
    .get(getSingleCategory)
    .put(uploadSingleFile('image','categories'),updateCategory)
    .delete(deleteCategory)

export default categoryRouter