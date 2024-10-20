import { Router } from 'express'
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from './product.controller.js'

const productRouter = Router()

productRouter.route('/')
    .post(addProduct)
    .get(getAllProducts)

productRouter.route('/:id')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct)

export default productRouter