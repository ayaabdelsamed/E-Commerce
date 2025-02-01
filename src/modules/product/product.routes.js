import { Router } from 'express'
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from './product.controller.js'
import { uploadMixOfFiles } from '../../fileUpload/fileUpload.js'

const productRouter = Router()

productRouter.route('/')
    .post(uploadMixOfFiles([{name:'imageCover', maxCount: 1},{name:'images',maxCount:10}], 'products'),addProduct)
    .get(getAllProducts)

productRouter.route('/:id')
    .get(getSingleProduct)
    .put(uploadMixOfFiles([{name:'imageCover', maxCount: 1},{name:'images',maxCount:10}], 'products'),updateProduct)
    .delete(deleteProduct)

export default productRouter