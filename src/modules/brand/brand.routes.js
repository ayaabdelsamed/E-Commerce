import { Router } from 'express'
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from './brand.controller.js'

const brandRouter = Router()

brandRouter.route('/')
    .post(addBrand)
    .get(getAllBrands)

brandRouter.route('/:id')
    .get(getSingleBrand)
    .put(updateBrand)
    .delete(deleteBrand)

export default brandRouter