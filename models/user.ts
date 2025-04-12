import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    username:{
        type: String,
        unique: true,
        required: true,
    },
    website:{
        type: String,
    },
    about:{
        type: String,
    },
    role:{
        type: String,
        default: 'user',
    }

}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', userSchema);