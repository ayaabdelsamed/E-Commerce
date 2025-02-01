import mongoose, { Types } from "mongoose";


const schema = mongoose.Schema({
    name: {
        type: String,
        unique: [true,'name is required'],
        trim: true,
        required: true,
        minlength: [2,'too short category name'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
        unique: [true,'slug is required'],
    },
    image: String,
    createdBy: {
        type: Types.ObjectId,
        ref: 'user'
    }
    
    
},{timestamps: true, versionKey: false})

schema.post('init',function(doc){
    doc.image = "http://localhost:3000/uploads/categories/"+doc.image
})

export const categoryModel=mongoose.model('category',schema);