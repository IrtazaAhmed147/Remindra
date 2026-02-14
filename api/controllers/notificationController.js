import notificationModel from "../models/notificationModel.js";
import quizModel from "../models/quizModel.js";
import assignmentsModel from "../models/assignmentsModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import SubscriptionModel from "../models/SubscriptionModel.js";

import { sendPushNotification } from "../utils/webPush.js";

export const notifyAssignments = async (req, res) => {
  try {
    const now = new Date();

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const twoDaysAfterStart = new Date(todayStart);
    twoDaysAfterStart.setDate(todayStart.getDate() + 2);

    const twoDaysAfterEnd = new Date(todayEnd);
    twoDaysAfterEnd.setDate(todayEnd.getDate() + 2);

    // ---------------------------------
    // Assignments due in 2 days
    // ---------------------------------
    const assignmentsTwoDays = await assignmentsModel.find({
      dueDate: { $gte: twoDaysAfterStart, $lte: twoDaysAfterEnd }, status: "Pending"
    });


    // Today morning assignments (8 AM - 12 PM)
    let assignmentsTodayMorning = [];
    if (now.getHours() >= 8 && now.getHours() <= 12) {
      assignmentsTodayMorning = await assignmentsModel.find({
        dueDate: { $gte: todayStart, $lte: todayEnd }, status: "Pending"
      });
    }

    // ---------------------------------
    // Send function
    // ---------------------------------
    const sendReminder = async (assignment, message) => {
      console.log(assignment);

      const userId = assignment.createdBy;
      const formattedDate = assignment?.dueDate
        ? new Date(assignment.dueDate).toDateString()
        : "Unknown date";
      // DB se subscription
      const subscription = await SubscriptionModel.findOne({ userId });
      let notificationData = await notificationModel({ title: "Assignment Reminder", message: `The assignment ${assignment.title} is due on ${formattedDate}.`, userId, type: "assignment" })

      let res = await notificationData.save()
      console.log(res);

      if (!subscription) return;



      // OneSignal push
      await sendPushNotification(subscription.subscription, {
        title: "Assignment Reminder",
        message,
      });
    };

    // ----------------------
    // Send notifications
    // ----------------------
    for (let assignment of assignmentsTwoDays) {
      await sendReminder(
        assignment,
        `${assignment.title} is due in 2 days! Complete it early.`
      );
    }


    for (let assignment of assignmentsTodayMorning) {
      await sendReminder(
        assignment,
        `${assignment.title} is due today! Submit before the deadline.`
      );
    }

    return res.status(200).json({
      success: true,
      message: "Assignment reminders processed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const notifyAssignmentsOnNight = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(todayEnd.getDate() + 1);


    // Tomorrow night assignments (after 8 PM)
    let assignmentsNight = [];
    if (now.getHours() >= 20) {
      assignmentsNight = await assignmentsModel.find({
        dueDate: { $gte: tomorrowStart, $lte: tomorrowEnd }, status: "Pending"
      });
    }

    // ---------------------------------
    // Send function
    // ---------------------------------
    const sendReminder = async (assignment, message) => {
      console.log(assignment);

      const userId = assignment.createdBy;
      const formattedDate = assignment?.dueDate
        ? new Date(assignment.dueDate).toDateString()
        : "Unknown date";
      // DB se subscription
      const subscription = await SubscriptionModel.findOne({ userId });
      let notificationData = await notificationModel({ title: "Assignment Reminder", message: `The assignment ${assignment.title} is due on ${formattedDate}.`, userId, type: "assignment" })

      let res = await notificationData.save()
      console.log(res);

      if (!subscription) return;



      // OneSignal push
      await sendPushNotification(subscription.subscription, {
        title: "Assignment Reminder",
        message,
      });
    };


    for (let assignment of assignmentsNight) {
      await sendReminder(
        assignment,
        `${assignment.title} is due tomorrow! Don't forget to finish it.`
      );
    }


    return res.status(200).json({
      success: true,
      message: "Assignment reminders processed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const notifyQuiz = async (req, res) => {
  try {
    const now = new Date();

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const twoDaysAfterStart = new Date(todayStart);
    twoDaysAfterStart.setDate(todayStart.getDate() + 2);

    const twoDaysAfterEnd = new Date(todayEnd);
    twoDaysAfterEnd.setDate(todayEnd.getDate() + 2);

    const quizzesTwoDays = await quizModel.find({
      dueDate: { $gte: twoDaysAfterStart, $lte: twoDaysAfterEnd }, status: "Pending"
    });


    let quizzesTodayMorning = [];
    if (now.getHours() >= 8 && now.getHours() <= 12) {
      quizzesTodayMorning = await quizModel.find({
        dueDate: { $gte: todayStart, $lte: todayEnd }, status: "Pending"
      });
    }

    const sendReminder = async (quiz, message) => {

      const userId = quiz.createdBy;
      const formattedDate = quiz?.dueDate
        ? new Date(quiz.dueDate).toDateString()
        : "Unknown date";
      const subscription = await SubscriptionModel.findOne({ userId });
      let notificationData = await notificationModel({ title: "Quiz Reminder", message: `The quiz ${quiz?.title} is due on ${formattedDate}.`, userId, type: "quiz" })
      await notificationData.save()


      if (!subscription) return;

      await sendPushNotification(subscription.subscription, {
        title: "Quiz Reminder",
        message
      });
    };

    // 2 Days Before
    for (let quiz of quizzesTwoDays) {

      await sendReminder(quiz, `${quiz.title} is due in 2 days!`);
    }


    // Today Morning Reminder
    for (let quiz of quizzesTodayMorning) {
      await sendReminder(quiz, `${quiz.title} is due today! Complete it soon.`);
    }

    return res.status(200).json({
      success: true,
      message: "All reminders processed successfully"
    });

  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
}

export const notifyQuizOnNight = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(todayEnd.getDate() + 1);


    let quizzesNight = [];
    if (now.getHours() >= 20) {
      quizzesNight = await quizModel.find({
        dueDate: { $gte: tomorrowStart, $lte: tomorrowEnd }, status: "Pending"
      });
    }
    const sendReminder = async (quiz, message) => {

      const userId = quiz.createdBy;
      const formattedDate = quiz?.dueDate
        ? new Date(quiz.dueDate).toDateString()
        : "Unknown date";
      const subscription = await SubscriptionModel.findOne({ userId });
      let notificationData = await notificationModel({ title: "Quiz Reminder", message: `The quiz ${quiz?.title} is due on ${formattedDate}.`, userId, type: "quiz" })
      await notificationData.save()


      if (!subscription) return;

      await sendPushNotification(subscription.subscription, {
        title: "Quiz Reminder",
        message
      });
    };

    for (let quiz of quizzesNight) {
      await sendReminder(quiz, `${quiz.title} is due tomorrow! Don't forget.`);
    }

    return res.status(200).json({
      success: true,
      message: "All reminders processed successfully"
    });

  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
}


export const subscribe = async (req, res) => {
  try {
    const { subscription, userId } = req.body;
    console.log(subscription);

    const data = await SubscriptionModel.findOneAndUpdate(
      { userId: userId },
      { subscription },
      { upsert: true }
    );

    return successHandler(res, 200, data);

  } catch (err) {
    console.log(err);

    return errorHandler(res, 500, "Something went wrong", err);
  }
}

export const getNotifications = async (req, res) => {
  try {

    const notifications = await notificationModel.find({ userId: req?.user?.id }).sort({createdAt:-1}).limit(15);

    return successHandler(res, 200, "notifications fetched successfully", notifications);
  } catch (err) {
    return errorHandler(res, 500, "Something went wrong", err);

  }
}