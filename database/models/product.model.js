import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    title: {
        type: String,
        unique: [true,'title is required'],
        trim: true,
        required: true,
        minlength: [2,'too short title'],
        maxLength: [200,'too long title'],
    },
    slug:{
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: [30,'too short title'],
        maxLength: [2000,'too long description']
    },
    imgageCover: String,
    images: [],
    rateAvg: {
        type: Number,
        min: 0,
        max: 5,
    },
    rateCount: {
        type: Number,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    proceAfterDiscount: {
        type: Number,
        min: 0,
        required: true,
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    sold: Number,
    category: {
        type: Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'subCategory'
    },
    brand: {
        type: Types.ObjectId,
        ref: 'brand'
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'user'
    } 
},{timestamps: true , versionKey: false})

export const productModel=mongoose.model('product',schema);