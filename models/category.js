import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }],
    image: {
        type: String // Fixed the typo
    }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
