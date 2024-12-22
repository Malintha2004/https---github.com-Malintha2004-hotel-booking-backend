import mongoose from "mongoose";

const category = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const Category = mongoose.model('Category',category)

export default Category;