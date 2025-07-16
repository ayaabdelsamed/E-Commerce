import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    user:{
        type: Types.ObjectId,
        ref: 'user'
    },
    orderItems:[
        {
            product:{
                type: Types.ObjectId,
                ref: 'product'
            },
            quantity: Number,
            price: Number
        }
    ],
    totalOrderPrice: Number,
    shippingAddress: {
        city: String,
        street: String,
        phone: String
    },
    PaymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDeliverd: {
        type: Boolean,
        default: false
    },
    deliverdAt: Date

},{timestamps: true , versionKey: false})


export const orderModel=mongoose.model('order',schema);