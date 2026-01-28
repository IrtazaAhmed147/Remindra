import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    rollNo: { type: String},
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    university: { type: String },
    field: { type: String },
    semester: { type: Number },
    gender: { type: String },
    phone: { type: String },
    otp: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    resetPasswordExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuspend: {
        type: Boolean,
        default: false
    },
    isDeactivate: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)