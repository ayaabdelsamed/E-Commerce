import express from 'express'
import { addCategory, getAllCategories, getSingleCategory } from './category.controller.js'

const categoryRouter = express.Router()

categoryRouter
    .route('/')
    .post(addCategory)
    .get(getAllCategories)

    categoryRouter
    .route('/:id')
    .get(getSingleCategory)

export default categoryRouter