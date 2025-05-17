const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    university: {
        type: String,
        required: true,
        default: "SRM Delhi-NCR, Sonepat",
    },
    course: {
        type: String,
        required: true,
    },
    yearOfGrad: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    googleSignIn: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

module.exports = User;