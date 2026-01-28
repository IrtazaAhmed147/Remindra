import { Box, Typography, Button, Switch, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribe } from "../../redux/actions/settingActions";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/HelperFunctions";
import SettingCard from "../../components/cards/SettingCard";
import ThemeBtn from "../../components/common/themeBtn";
import NotificationSwitch from "../../components/common/NotificationSwitch";

function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkTheme, setDarkTheme] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Load initial permission status
  useEffect(() => {

    if (!user || !("Notification" in window)) return;

    const permission = Notification.permission;

    if (permission === "granted") {
      dispatch(subscribe(user._id, true)).then(() => {

        setNotificationsEnabled(true)
      }).catch((msg) => notify("error",msg))
    } else {

      dispatch(subscribe(user._id, false)).then(() => setNotificationsEnabled(false)).catch((msg) => notify("error",msg))
    }

  }, [user]);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkTheme(true);
    }
  }, []);



  const toggleTheme = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      // switch OFF dark mode
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setDarkTheme(false);
    } else {
      // switch ON dark mode
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDarkTheme(true);
    }
  };



  const handleNotification = async () => {
    if (!user) return;
    if (!("Notification" in window)) {
      notify("error", "Browser does not support notifications");
      return;
    }

    // TURN OFF
    if (notificationsEnabled) {
      dispatch(subscribe(user._id, false)).catch((msg) => console.log(msg));
      setNotificationsEnabled(false);
      notify("success", "Notifications turned off");
      return;
    }

    // TURN ON
    if (Notification.permission === "granted") {
      await dispatch(subscribe(user._id, true));
      setNotificationsEnabled(true);
      notify("success", "Notifications enabled");
      return;
    }

    if (Notification.permission === "denied") {
      await dispatch(subscribe(user._id, false));
      setNotificationsEnabled(false);
      notify(
        "error",
        "Notifications are blocked. Enable them from browser settings."
      );
      return;
    }

    // DEFAULT → ASK PERMISSION
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
       dispatch(subscribe(user._id, true));
      setNotificationsEnabled(true);
      notify("success", "Notifications enabled");
    } else {
       dispatch(subscribe(user._id, false));
      setNotificationsEnabled(false);
      notify("error", "Notification permission denied");
    }
  };


  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        padding: { xs: "10px", sm: "20px", md: "30px" },
        pt: "5px !important",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: "var(--text-color)", mb: 3, fontSize: { xs: 18, sm: 20, md: 22 } }}
      >
        Settings
      </Typography>

      <SettingCard
        title="Notifications"
        desc="Get alerts for deadlines, quizzes, and announcements"
        action={
          <NotificationSwitch
            checked={notificationsEnabled}
            onChange={handleNotification}
            disabled={Notification.permission === "denied"}
            color="primary"
          />

        }
      />


      <SettingCard
        title="Dark Mode"
        desc="Reduce eye strain and save battery"
        action={
          <ThemeBtn
            checked={darkTheme}
            onChange={toggleTheme}
            color="primary"
          />
        }
      />


      <Box
        onClick={() => navigate("/update/profile")}
        sx={{
          p: {xs:1.5,sm:2,md:3},
          mb: {xs:1.5,sm:2,md:3},
          borderRadius: 3,
          bgcolor: "var(--card-bg-color)",
          boxShadow: `
  0 1px 2px rgba(0, 0, 0, 0.08),
  0 4px 12px rgba(0, 0, 0, 0.06)
`,
          cursor: "pointer",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
        }}
      >
        <Typography fontWeight={600} color="var(--text-color)">Update Profile</Typography>
        <Typography fontSize={12} color="var(--text-muted-color)">
          Edit your personal information
        </Typography>
      </Box>


      {/* ---------------- DELETE ACCOUNT ---------------- */}
      <Box
        sx={{
          p: {xs:1.5,sm:2,md:3},
          mt: 4,
          borderRadius: 3,
          bgcolor: "rgba(239,68,68,0.08)",
          boxShadow: `
  0 1px 2px rgba(0, 0, 0, 0.08),
  0 4px 12px rgba(0, 0, 0, 0.06)
`,
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <Typography fontWeight={600} color="#ef4444">
          Danger Zone
        </Typography>

        <Button
          variant="contained"
          disabled={true}
          sx={{
            mt: 2,
            backgroundColor: "#ef4444",
            "&:hover": { backgroundColor: "#dc2626" },
            textTransform: "none",
          }}
        >
          Deactivate Account
        </Button>
      </Box>

    </Box>
  );
}

export default Setting;
