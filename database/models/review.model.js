import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        minlength: [10,'too short comment'],
    },
    user: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: Types.ObjectId,
        ref: 'product'
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    
    
},{timestamps: true , versionKey: false})

export const reviewModel=mongoose.model('review',schema);