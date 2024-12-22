import mongoose from "mongoose";

const userschema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        img: {
            type: String,
            default: "https://sl.bing.net/b8rlHsQr672"
        },
        password: {
            type: String,
            required: true
        },
        type:{
            type: String,
            default: "customer"
        },
        whatsapp:{
            type: String,
            required: true
        },
        phone:{
            required: true,
            type: String
        },
        disabled:{
            type: Boolean,
            default: false
        },
        emailVerified:{
            type: Boolean,
            default: false
        }
    }
);

const User = mongoose.model("Users", userschema);

export default User;