import resourceModel from "../models/resourceModel.js";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import nodemailer from "nodemailer";

export const sendEmailToUser = async (req, res) => {
    
    try {
        const { email, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.PORTAL_EMAIL,
                pass: process.env.PORTAL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: `<p>${message}</p>`,
        });
        return successHandler(res, 200, "Email send");
    } catch (err) {

        return errorHandler(res, 500, err.message);
    }
};


export const getAllStats = async (req, res) => {
    try {
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const [
            totalCourses,
            last24hCourses,
            materials,
            users,
            last24hUsers,


        ] = await Promise.all([
            courseModel.countDocuments(),
            courseModel.countDocuments({ createdAt: { $gte: last24Hours } }),
            resourceModel.countDocuments(),
            userModel.countDocuments(),
            userModel.countDocuments({ createdAt: { $gte: last24Hours } }),

        ]);


        successHandler(res, 200, "Dashboard stats fetched", { totalCourses, last24hCourses, materials, users, last24hUsers });

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
}