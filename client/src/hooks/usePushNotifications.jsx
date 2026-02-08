import { useEffect, useState } from "react";
import { notify } from "../utils/HelperFunctions";
import { useDispatch } from "react-redux";
import { subscribe } from "../redux/actions/settingActions";
import OneSignal from 'react-onesignal';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export default function usePushNotifications(user) {
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 🔹 INIT (on page load / refresh)

  useEffect(() => {
    const checkStatus = async () => {
      const optedIn = await OneSignal.User.PushSubscription.optedIn;
      setNotificationsEnabled(optedIn);

      const id = OneSignal.User.PushSubscription.id;
      if (id && user?._id) {
        dispatch(subscribe(user._id, id));
      }
    };

    checkStatus();
  }, [user]);

const toggleNotifications = async (checked) => {
    const permission = await OneSignal.Notifications.permission;
    console.log(permission);
    

    if (checked) {
      if (permission === "default") {
        await OneSignal.Notifications.requestPermission();
      }

      if (permission === "denied") {
        alert("Enable notifications from browser settings");
        return;
      }

      await OneSignal.User.PushSubscription.optIn();

      const id = OneSignal.User.PushSubscription.id;
      if (id) {
        dispatch(subscribe(user._id, id));
      }

      setNotificationsEnabled(true);
    } else {
      await OneSignal.User.PushSubscription.optOut();
      setNotificationsEnabled(false);
    }
  };

  return { notificationsEnabled, toggleNotifications };
}
