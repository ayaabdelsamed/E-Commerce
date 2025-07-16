import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    user:{
        type: Types.ObjectId,
        ref: 'user'
    },
    cartItems:[
        {
            product:{
                type: Types.ObjectId,
                ref: 'product'
            },
            quantity:{
                type: Number,
                default: 1
            },
            price: Number
        }
    ],
    totalCartPrice: Number,
    discount: Number,
    totalCartPriceAfterDiscount:Number,

},{timestamps: true , versionKey: false})


export const cartModel=mongoose.model('cart',schema);