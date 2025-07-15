import { Router } from 'express'
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from './review.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const reviewRouter = Router()
reviewRouter.route('/')
    .post(protectedRoutes,allowedTo('user'),addReview)
    .get(getAllReviews)

reviewRouter.route('/:id')
    .get(getSingleReview)
    .put(protectedRoutes,allowedTo('user'),updateReview)
    .delete(deleteReview,allowedTo('user','admin'),updateReview)

export default reviewRouter