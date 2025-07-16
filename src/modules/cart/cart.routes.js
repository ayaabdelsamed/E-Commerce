import { Router } from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addToCart } from './cart.controller.js'

const cartRouter = Router()

cartRouter.route('/')
    .post(protectedRoutes,allowedTo('user'),addToCart)
    .get(protectedRoutes,allowedTo('user'),getLoggedUsercartes)
cartRouter.route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),removecart)

export default cartRouter