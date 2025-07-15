import { Router } from 'express'
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from './coupon.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'



const couponRouter = Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.route('/')
    .post(addCoupon)
    .get(getAllCoupons)

    couponRouter.route('/:id')
    .get(getSingleCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)

export default couponRouter