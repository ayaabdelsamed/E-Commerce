import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from '../../../database/models/user.model.js'
import { cartModel } from "../../../database/models/cart.model.js"

const addToCart = catchError(async(req,res,next)=>{

    let isCartExist = await cartModel.findOne({user: req.user._id})
    
    if(!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItems:[req.body]
        })
        await cart.save()
        res.json({message:"success", cart})
    }else {
        res.json({message:"else"})
    }

})


export {
    addToCart,
    removeAddress,
    getLoggedUserAddresses
}