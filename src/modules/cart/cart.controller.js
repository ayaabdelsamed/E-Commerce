import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { cartModel } from "../../../database/models/cart.model.js"
import { productModel } from "../../../database/models/product.model.js"


function calcTotalPrice(isCartExist){
    let totalCartPrice = 0;
        isCartExist.cartItems.forEach(item =>{
            totalCartPrice += item.quantity * item.price
        })
}

const addToCart = catchError(async(req,res,next)=>{

    let isCartExist = await cartModel.findOne({user: req.user._id})

    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('Product not found',404))
    req.body.price = product.price

    if(req.body.quantity>product.stock) return next(new AppError('Sold Out',404))

    if(!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:"success", cart})
    }else {
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if (item) {
            item.quantity+= req.body.quantity || 1
            if(item.quantity > product.stock) return next(new AppError('Sold Out',404))
        }

        if(!item) isCartExist.cartItems.push(req.body)
        
        calcTotalPrice(isCartExist)

        await isCartExist.save()
        res.json({message:"success", cart:isCartExist})
    }
})

const updateQuantity = catchError(async(req,res,next)=>{
    let cart = await cartModel.findOne({user: req.user._id})

    let item = cart.cartItems.find(item => item.product == req.params.id)
    if(!item) return next(new AppError('Product not found',404))

    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json({message:"success", cart})
})

const removeItemFromCart = catchError(async(req,res,next)=>{

    let cart =await cartModel.findOneAndUpdate({user: req.user.id},
        {$pull: {cartItems:{ _id:req.params.id}}},{new:true})
    calcTotalPrice(cart)    
    await cart.save()
    cart || next(new AppError('cart not found',404))
    !cart || res.json({message:"success", cart})
})

const getLoggedUsercart = catchError(async(req,res,next)=>{
    let cart =await cartModel.findOne({ user: req.user._id })
    res.json({message:"success", cart})
})

const clearUserCart = catchError(async(req,res,next)=>{
    let cart =await cartModel.findOneAndDelete({ user: req.user._id })
    res.json({message:"success", cart})
})

export {
    addToCart,
    updateQuantity,
    removeItemFromCart,
    getLoggedUsercart,
    clearUserCart,
}