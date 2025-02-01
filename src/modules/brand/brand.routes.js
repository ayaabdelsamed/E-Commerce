import { Router } from 'express'
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from './brand.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'

const brandRouter = Router()

brandRouter.route('/')
    .post(uploadSingleFile('logo','brands'),addBrand)
    .get(getAllBrands)

brandRouter.route('/:id')
    .get(getSingleBrand)
    .put(uploadSingleFile('logo','brands'),updateBrand)
    .delete(deleteBrand)

export default brandRouter