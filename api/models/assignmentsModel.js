import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String },
    attachments: [{ type: String }], // file URLs
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
