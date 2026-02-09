import assignmentsModel from "../models/assignmentsModel.js";
import courseModel from "../models/courseModel.js";
import quizModel from "../models/quizModel.js";
import resourceModel from "../models/resourceModel.js";
import User from "../models/userModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllUsers = async (req, res) => {
    const { username, email, isAdmin, isSuspend, isDeactivate, members, limit } = req.query;
    console.log(members);

    const filter = {isAdmin: false};
    try {
        if (username?.trim()) {
            filter.username = {
                $regex: username.trim(),
                $options: "i"   // case-insensitive
            };
        }
        console.log("username ==>>", username);

        if (email?.trim()) {
            filter.email = {
                $regex: email.trim(),
                $options: "i"
            };
        }
        // if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
        if (isSuspend) filter.isSuspend = false;
        if (isDeactivate) filter.isDeactivate = false;

        if (members) {
            const m = JSON.parse(members);
            if (Array.isArray(m) && m.length > 0) {
                filter._id = { $nin: m };
            }
        }

        let query = User.find(filter);

        if (limit) {
            query = query.limit(Number(limit));
        }
        const userData = await query;
        successHandler(res, 200, "All users fetched", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getLoginUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return errorHandler(res, 404, "User not found");
        }
        successHandler(res, 200, "User found successfully", user)


    } catch (err) {
        errorHandler(res, 500, err.message);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);

        if (!userData) return errorHandler(res, 404, "user not found")
        successHandler(res, 200, "User found successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const userCourses = await courseModel.find({ owner: userId });

        for (let course of userCourses) {
            await resourceModel.deleteMany({ courseId: course._id });
        }

        await courseModel.deleteMany({ owner: userId });

        await resourceModel.deleteMany({ uploadedBy: userId });

        await assignmentsModel.deleteMany({ createdBy: userId });

        await quizModel.deleteMany({ createdBy: userId });

        const userData = await User.findByIdAndDelete(userId);


        return successHandler(res, 200, "User & related data deleted", userData);

    } catch (err) {
        console.log(err);
        return errorHandler(res, 400, err.message);
    }
};
export const deactivateUser = async (req, res) => {
    try {
        const { deactivate } = req.body;

        // 1. Update user (return new doc)
        const userData = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { isDeactivate: deactivate } },
            { new: true }
        );

        if (!userData) {
            return errorHandler(res, 404, "User not found");
        }

        // 2. Disable/enable all courses of user
        // if (userData.courses && userData.courses.length > 0) {
        //     await courseModel.updateMany(
        //         { _id: { $in: userData.courses } },   // filter
        //         { $set: { disable: deactivate } }     // update
        //     );
        // }

        return successHandler(res, 200, "User updated successfully", userData);

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
export const suspendUser = async (req, res) => {
    try {
        const { suspend } = req.body
        console.log(req.body);

        const userData = await User.findByIdAndUpdate(req.params.id, {
            $set: { isSuspend: suspend }
        });
        successHandler(res, 200, "User suspended successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const updateUser = async (req, res) => {

    try {
        const file = req.file
        if (file) {
            const url = await uploadOnCloudinary(file, 'remindra-user-images');
            req.body.profilePic = url.secure_url
        }
        const userData = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "User updated successfully", userData)



    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
