import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    code:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    expires: Date,
    discount: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'user'
    }
},{timestamps: true , versionKey: false})

export const couponModel=mongoose.model('coupon',schema);