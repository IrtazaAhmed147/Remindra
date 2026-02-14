import express from "express";
import SubscriptionModel from "../models/SubscriptionModel.js";
import { sendPushNotification } from "../utils/webPush.js";

import { getNotifications, notifyAssignments, notifyAssignmentsOnNight, notifyQuiz, notifyQuizOnNight, subscribe } from "../controllers/notificationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const notificationRouter = express.Router();

// Save user subscription
notificationRouter.post("/subscribe", subscribe);
notificationRouter.get("/notifyassignments", notifyAssignments);
notificationRouter.get("/notifyassignments/night", notifyAssignmentsOnNight);
notificationRouter.get("/notifyquiz", notifyQuiz);
notificationRouter.get("/notifyquiz/night", notifyQuizOnNight);
notificationRouter.get("/user",verifyToken, getNotifications);


// Trigger notification (example: after uploading resource)
notificationRouter.post("/notify/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, message } = req.body;

    const sub = await SubscriptionModel.findOne({ userId });
    if (!sub) return res.status(404).json({ error: "User subscription not found" });

    await sendPushNotification(sub.subscription, { title, message });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// notificationRouter.get("/notifyassignments", async (req, res) => {
//     try {

//         const now = new Date();

//         const todayStart = new Date(now);
//         todayStart.setHours(0, 0, 0, 0);

//         const todayEnd = new Date(now);
//         todayEnd.setHours(23, 59, 59, 999);

//         const tomorrowStart = new Date(todayStart);
//         tomorrowStart.setDate(todayStart.getDate() + 1);

//         const tomorrowEnd = new Date(todayEnd);
//         tomorrowEnd.setDate(todayEnd.getDate() + 1);

//         const twoDaysAfterStart = new Date(todayStart);
//         twoDaysAfterStart.setDate(todayStart.getDate() + 2);

//         const twoDaysAfterEnd = new Date(todayEnd);
//         twoDaysAfterEnd.setDate(todayEnd.getDate() + 2);

//         // ---------------------------------
//         // 1) Assignments due in 2 days
//         // ---------------------------------
//         const assignmentsTwoDays = await assignmentsModel.find({
//             dueDate: { $gte: twoDaysAfterStart, $lte: twoDaysAfterEnd }
//         });


//         let assignmentsNight = [];
//         if (now.getHours() >= 20) {
//             assignmentsNight = await assignmentsModel.find({
//                 dueDate: { $gte: tomorrowStart, $lte: tomorrowEnd }
//             });
//         }

//         // ---------------------------------
//         // 3) Assignments due today (Morning Reminder)
//         // ---------------------------------
//         let assignmentsTodayMorning = [];
//         if (now.getHours() >= 8 && now.getHours() <= 12) {
//             assignmentsTodayMorning = await assignmentsModel.find({
//                 dueDate: { $gte: todayStart, $lte: todayEnd }
//             });

//         }

//         // Send function
//         const sendReminder = async (assignment, message) => {
//             const userId = assignment.createdBy;

//             const subscription = await SubscriptionModel.findOne({ userId });

//             if (!subscription) return;

//             await sendPushNotification(subscription.subscription, {
//                 title: "Assignment Reminder",
//                 message
//             });
//                   };

//         // 2 Days before
//         for (let assignment of assignmentsTwoDays) {

//             await sendReminder(
//                 assignment,
//                 `${assignment.title} is due in 2 days! Complete it early.`
//             );
//         }

//         // Tomorrow night
//         for (let assignment of assignmentsNight) {

//             await sendReminder(
//                 assignment,
//                 `${assignment.title} is due tomorrow! Don't forget to finish it.`
//             );
//         }

//         // Today morning
//         for (let assignment of assignmentsTodayMorning) {

//             await sendReminder(
//                 assignment,
//                 `${assignment.title} is due today! Submit before the deadline.`
//             );
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Assignment reminders processed successfully"
//         });

//     } catch (error) {
//         console.log(error);

//           errorHandler(res, 500, error.message);
//     }
// });


// ---------------------------------


notificationRouter.post("/send-test", async (req, res) => {
  const { userId, message } = req.body;
  // console.log(subscriptionId);

  try {

    const subscriptions = await SubscriptionModel.find();
    const subscriptionIds = subscriptions.map(sub => sub.subscription);
    console.log(subscriptionIds);

    if (!subscriptions) return;

    const response = await fetch("https://api.onesignal.com/notifications?c=push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Key ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.ONESIGNAL_APP_ID,
        headings: { en: "Reminder" },
        contents: { en: message },
        include_subscription_ids: subscriptionIds, // 🔥 main cheez
        target_channel: "push",
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send notification" });
  }

  // const subscriptions = await SubscriptionModel.find();

  // for (let sub of subscriptions) {
  //   await sendPushNotification(sub.subscription, {
  //     title: "Reminder",
  //     message: "Assignment deadline aa rahi hai!",
  //   }); 
  // }

  // res.json({ success: true });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
}

);


export default notificationRouter;
