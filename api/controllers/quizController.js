import courseModel from "../models/courseModel.js";
import quizModel from "../models/quizModel.js";
import { uploadOnCloudinary, deleteFromCloudinary, uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createQuizs = async (req, res) => {
    try {
        const files = req.files || [];
        const { title, description, dueDate, status } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return errorHandler(res, 400, "Title and description are required");
        }

        if (!dueDate) {
            return errorHandler(res, 400, "Due date required");
        }

        const attachments = [];

        for (const file of files) {
            if (file.mimetype?.startsWith("image/")) {
                const url = await uploadOnCloudinary(file, "quizFiles");
                attachments.push({ url: url.secure_url, mimetype: file.mimetype });
            } else if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
                const url = await uploadFileOnCloudinary(file, "quizFiles");
                attachments.push({ url: url.secure_url, mimetype: file.mimetype });
            } else {
                console.log("Unsupported file type:", file.mimetype);
            }

        }
        console.log(title, description, dueDate, attachments);

        const quiz = new quizModel({
            title: title,
            description,
            createdBy: req.user.id,
            dueDate,
            status,
            attachments,
            courseId: req.params.id,
            type: "quiz"
        });

        const saved = await quiz.save();

        await courseModel.findByIdAndUpdate(req.params.id, {
            $push: { quizzes: saved._id }
        });

        successHandler(res, 200, "Quiz created successfully", saved);
        // successHandler(res, 200, "Assignment created successfully");

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};



export const getAllQuizs = async (req, res) => {
    try {

        const { title, dueDate, createdBy, status } = req.query;

        const filter = {};
        if (title) { filter.title = { $regex: title, $options: "i" } };
        if (dueDate) { filter.dueDate = dueDate };
        if (createdBy) { filter.createdBy = createdBy };
        if (status) { filter.status = status };



        const quizzes = await quizModel.find(filter);
        successHandler(res, 200, "All quizzes fetched", quizzes);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const getSingleQuiz = async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id).populate({
            path: "courseId",
            select: "title"
        });
        if (!quiz) return errorHandler(res, 404, "Quiz not found");

        successHandler(res, 200, "Quiz found", quiz);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const getUserQuizs = async (req, res) => {
    try {
        const { title, dueDate, status,courseId } = req.query;

        const filter = { };
        if (title) { filter.title = { $regex: title, $options: "i" } };
        if (dueDate) { filter.dueDate = dueDate };
        if (courseId) { filter.courseId = courseId };
        if (status && status !== 'all') { filter.status = status };
        const quizzes = await quizModel.find(filter).populate({
            path: "courseId",
            select: "title"
        });

        successHandler(res, 200, "quizzes fetched", quizzes);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id);
        if (!quiz) return errorHandler(res, 404, "Quiz not found");

        for (const url of quiz.attachments) {
            await deleteFromCloudinary(url);
        }

        await quizModel.findByIdAndDelete(req.params.id);

        await courseModel.findByIdAndUpdate(req.params.courseId, {
            $pull: { quizzes: req.params.id }
        });

        successHandler(res, 200, "Quiz deleted successfully");

    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const updateQuiz = async (req, res) => {
    try {
        const files = req.files || [];
        req.body.attachments = [];
        if (req.files) {

            for (const file of files) {
                if (file.mimetype?.startsWith("image/")) {
                    const url = await uploadOnCloudinary(file, "quizFiles");
                    req.body.attachments.push({ url: url.secure_url, mimetype: file.mimetype });
                } else if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
                    const url = await uploadFileOnCloudinary(file, "quizFiles");
                    req.body.attachments.push({ url: url.secure_url, mimetype: file.mimetype });
                } else {
                    console.log("Unsupported file type:", file.mimetype);
                }

            }
        }
        console.log(req.body);

        const updated = await quizModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (req?.body?.newAttachment) {
            updated.attachments.push(req.body.newAttachment);
            await updated.save();
        }

        successHandler(res, 200, "quiz updated", updated);

    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};
