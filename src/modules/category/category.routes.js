import { Router } from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from './category.controller.js'

const categoryRouter = Router()

categoryRouter.route('/')
    .post(addCategory)
    .get(getAllCategories)

categoryRouter.route('/:id')
    .get(getSingleCategory)
    .put(updateCategory)
    .delete(deleteCategory)

export default categoryRouter