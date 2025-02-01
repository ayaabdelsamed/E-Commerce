import { Router } from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from './category.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'

const categoryRouter = Router()

categoryRouter.route('/')
    .post(uploadSingleFile('image','categories'),addCategory)
    .get(getAllCategories)

categoryRouter.route('/:id')
    .get(getSingleCategory)
    .put(uploadSingleFile('image','categories'),updateCategory)
    .delete(deleteCategory)

export default categoryRouter