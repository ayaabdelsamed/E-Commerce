import mongoose from "mongoose";


const schema = mongoose.Schema({
    code:{
        type: String,
        trim: true,
        required: true,
    },
    expire: Date,
    discount: {
        type: Number,
        required: true,
    }
    
    
},{timestamps: true})

export const couponModel=mongoose.model('coupon',schema);