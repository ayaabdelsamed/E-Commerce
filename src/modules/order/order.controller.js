import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { cartModel } from "../../../database/models/cart.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { orderModel } from "../../../database/models/order.model.js";

const createCashOrder = catchError(async(req,res,next)=>{
    // 1- get user cart by cartID
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError('Cart not found',404))
    // 2- total order price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    // 3- create order
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    // 4- increment sold & decrement stock
    let options = cart.cartItems.map((prod)=>{
        return ({
            updateOne: {
                "filter": { _id: prod.product},
                "update": { $inc: { sold: prod.quantity, stock: -prod.quantity }}
            }
        })
    })
    await productModel.bulkWrite(options)
    // 5- clear user cart
    await cartModel.findByIdAndDelete(cart._id)
    res.json({message: "success"})
})

const getUserOrders = catchError(async(req,res,next)=>{
    let order = await orderModel.findOne({ user: req.user._id}).populate('orderItems.product')
    res.json({message: "success"})
})

const getAllOrders = catchError(async(req,res,next)=>{
    let order = await orderModel.find({})
    res.json({message: "success"})
})

export {
    createCashOrder,
    getUserOrders,
    getAllOrders
}