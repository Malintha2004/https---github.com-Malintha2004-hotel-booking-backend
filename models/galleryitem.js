import mongoose from "mongoose";

const gallerryitemSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})

const Galleryitem = mongoose.model('GalleryItem',gallerryitemSchema)

export default Galleryitem;
