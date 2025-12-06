import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },

    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String },
    description: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
