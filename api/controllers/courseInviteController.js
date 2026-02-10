import courseInviteModel from "../models/courseInviteModel.js";
import courseModel from "../models/courseModel.js";
import SubscriptionModel from "../models/SubscriptionModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import { sendPushNotification } from "../utils/webPush.js";

export const sendInvite = async (req, res) => {
    try {

        const { receiverIds } = req.body

        const course = await courseModel.findById(req.params.courseId);
        for (const id of receiverIds) {

            let invite = await courseInviteModel({
                senderId: req.user.id, receiverId: id, courseId: req.params.courseId, status: "pending"
            })
            await invite.save();
        }
        for (const id of receiverIds) {
            const sub = await SubscriptionModel.findOne({ userId: id });
            if (sub && sub?.subscription) {
                await sendPushNotification(sub.subscription, {
                    title: "You're Invited!",
                    message: `${req?.user?.username} invited you to join "${course?.title}".`
                });
            }

        }
        return successHandler(res, 200, "invitations send successfully")
        // successHandler(res, 200, "invitation send successfully")

    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}
export const updateInvite = async (req, res) => {
    try {
        const { status } = req.body;
        const inviteId = req.params.id;
        const invite = await courseInviteModel.findByIdAndUpdate(
            inviteId,
            { status },
            { new: true }
        );
        console.log(invite);

        const courseId = invite.courseId;
        const receiverId = invite.receiverId;

        // 1. Update status

        // 2. If accepted → add receiver to course members
        if (status === "accept") {
            await courseModel.findByIdAndUpdate(
                courseId,
                {
                    $addToSet: { members: receiverId }  // prevents duplicates
                },
                { new: true }
            );

            successHandler(res, 200, "Invitation Accepted successfully", invite);
        } else {
            successHandler(res, 200, "Invitation Rejected successfully", invite);

        }

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};

export const getAllInvitations = async (req, res) => {
    try {

        const invites = await courseInviteModel.find();
        successHandler(res, 200, "invitations fetched successfully", invites)

    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getUserInvitations = async (req, res) => {
    try {

        const invites = await courseInviteModel.find({ receiverId: req.user.id, status: 'pending' }).populate([
            {
                path: "senderId",
                select: ["username", "profilePic"],
                model: "User",
            },
            {
                path: "courseId",
                select: "title",
                model: "course",
            },

        ]);
        successHandler(res, 200, "invitations fetched successfully", invites)

    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

