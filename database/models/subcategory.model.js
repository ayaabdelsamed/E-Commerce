import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    name: {
        type: String,
        unique: [true,'name is required'],
        trim: true,
        required: true,
        minlength: [2,'too short name'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'category'
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'user'
    }
    
    
},{timestamps: true , versionKey: false})

export const subCategoryModel=mongoose.model('subCategory',schema);