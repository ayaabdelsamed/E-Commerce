import mongoose from "mongoose"


export const dbConnection=()=>{
    mongoose.connect('mongodb://localhost:27017/Ecommerce')
    .then(()=>console.log('Mongodb is Connected'))
    .catch((err)=>console.log('Database Error',err))
}