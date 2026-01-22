import assignmentsModel from "../models/assignmentsModel.js";
import courseInviteModel from "../models/courseInviteModel.js";
import courseModel from "../models/courseModel.js";
import notificationModel from "../models/notificationModel.js";
import quizModel from "../models/quizModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const dashboardStats = async (req, res) => {
    try {

        const [
            totalCourses,
            sharedCourses,
            totalAssignments,
            pendingAssignments,
            completedAssignments,
            totalQuizzes,
            pendingQuizzes,
            completedQuizzes,
            notifications
        ] = await Promise.all([
            courseModel.countDocuments({ owner: req?.user?.id }),
            courseModel.countDocuments({ members: req?.user?.id }),
            assignmentsModel.countDocuments({ createdBy: req?.user?.id }),
            assignmentsModel.countDocuments({ createdBy: req?.user?.id, status: "Pending" }),
            assignmentsModel.countDocuments({ createdBy: req?.user?.id, status: "Completed" }),
            quizModel.countDocuments({ createdBy: req?.user?.id }),
            quizModel.countDocuments({ createdBy: req?.user?.id, status: "Pending" }),
            quizModel.countDocuments({ createdBy: req?.user?.id, status: "Completed" }),
            courseInviteModel.countDocuments({ receiverId: req?.user?.id, status:"pending" }),
        ]);


        successHandler(res, 200, "Dashboard stats fetched", { totalCourses, sharedCourses, totalAssignments, totalQuizzes, pendingAssignments, completedAssignments, pendingQuizzes, completedQuizzes ,notifications});

    } catch (error) {
        errorHandler(res, 400, err.message);
    }
}