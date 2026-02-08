import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

webpush.setVapidDetails(
  "mailto:irtz.studio@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// export const sendPushNotification = async (subscription, payload) => {
//     console.log(subscription);
    
//     try {
//         await webpush.sendNotification(subscription, JSON.stringify(payload));
//         console.log("Push notification sent!");
//     } catch (error) {
//         console.log("Push notification error:", error);
//     }
// };



export const sendPushNotification = async (subscriptionId, { title, message }) => {
  console.log(title,message);
  
  if (!subscriptionId) return;

  const response = await fetch("https://api.onesignal.com/notifications?c=push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Key ${process.env.ONESIGNAL_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: message },
      include_subscription_ids: [subscriptionId],
      target_channel: "push",
    }),
  });

  const data = await response.json();
  console.log("Push result:", data);
};
