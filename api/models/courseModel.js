import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    courseCode: {
        type: String,
    },
    owner: {
        type: String,
        required: true,
    }, assignments: {
        type: [String],
    }, quizzes: {
        type: [String],
    }, materials: {
        type: [String],
    },
},
    { timestamps: true }
)

export default mongoose.model("course", courseSchema)