import express from 'express'
import { addCategory } from './category.controller.js'

const categoryRouter = express.Router()

categoryRouter
.route('/categories')
.post(addCategory)

export default categoryRouter