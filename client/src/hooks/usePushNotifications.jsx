import { useEffect, useState } from "react";
import { notify } from "../utils/HelperFunctions";
import { useDispatch } from "react-redux";
import { subscribe } from "../redux/actions/settingActions";
import OneSignal from 'react-onesignal';

// const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export default function usePushNotifications(user) {
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 🔹 INIT (on page load / refresh)

  useEffect(() => {
  if (!user?._id) return;

  const initPush = async () => {
    // await OneSignal.init({
    //   appId: import.meta.env.VITE_ONE_SIGNAL_APP_ID,
    //   allowLocalhostAsSecureOrigin: true,
    // });

    OneSignal.Notifications.addEventListener("permissionChange", async () => {
      const id = OneSignal.User.PushSubscription.id;

      notify("error","id mil gayi", id)
      if (id) {
        notify("error","id mil gayi or add ho rahi hai ", id)
        setNotificationsEnabled(true);
        dispatch(subscribe(user._id, id));
      }
    });
    
    // Important: wait for subscription to exist
    OneSignal.User.PushSubscription.addEventListener("change", async () => {
      const id = OneSignal.User.PushSubscription.id;
      
      notify("error","id mil gayi 2", id)
      if (id) {
        notify("error","id mil gayi or add ho rahi hai 2", id)
        setNotificationsEnabled(true);
        dispatch(subscribe(user._id, id));
      }
    });
  };

  initPush();
}, [user]);


const toggleNotifications = async (checked) => {
    const permission = await OneSignal.Notifications.permission;
    console.log(permission);
    

    if (checked) {
      if (permission === "default") {
        await OneSignal.Notifications.requestPermission();
      }

      if (permission === "denied") {
        notify("error","Enable notifications from browser settings");
        return;
      }

      await OneSignal.User.PushSubscription.optIn();
      notify("error","optIn")
      const id = OneSignal.User.PushSubscription.id;
      if (id) {
        notify("error","add ho raha hai ,",id)
        dispatch(subscribe(user._id, id));
      }
      
      setNotificationsEnabled(true);
    } else {
      await OneSignal.User.PushSubscription.optOut();
      notify("error","optOut")
      setNotificationsEnabled(false);
    }
  };

  return { notificationsEnabled, toggleNotifications };
}
