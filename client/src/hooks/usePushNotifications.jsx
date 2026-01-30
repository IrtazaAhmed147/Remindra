import { useEffect, useState } from "react";
import { notify } from "../utils/HelperFunctions";
import { useDispatch } from "react-redux";
import { subscribe } from "../redux/actions/settingActions";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export default function usePushNotifications(user) {
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 🔹 INIT (on page load / refresh)
  useEffect(() => {
    const init = async () => {
      if (!user || !("Notification" in window)) return;

      if (Notification.permission !== "granted") {
        setNotificationsEnabled(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      console.log(subscription);
      
      if (subscription) {
        dispatch(subscribe(user._id, subscription));
        setNotificationsEnabled(true);
      }
    };

    init();
  }, [user]);

  const toggleNotifications = async () => {
    if (!user) return;

    // TURN OFF
    if (notificationsEnabled) {
      dispatch(subscribe(user._id, false));
      setNotificationsEnabled(false);
      notify("success", "Notifications turned off");
      return;
    }

    // ASK PERMISSION
    let permission = Notification.permission;
    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      notify("error", "Notification permission denied");
      return;
    }

    // SUBSCRIBE
    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY,
      });
    }

    dispatch(subscribe(user._id, subscription));
    setNotificationsEnabled(true);
    notify("success", "Notifications enabled");
  };

  return { notificationsEnabled, toggleNotifications };
}
