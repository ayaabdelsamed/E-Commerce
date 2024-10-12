import mongoose from "mongoose";


const schema = mongoose.Schema({
    name: {
        type: String,
        unique: [true,'name is unique'],
        trim: true,
        required: true,
        minlength: [2,'too short name'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
    
    
},{timestamps: true})

export const categoryModel=mongoose.model('category',schema);