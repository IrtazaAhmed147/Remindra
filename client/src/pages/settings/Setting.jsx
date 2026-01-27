import { Box, Typography, Button, Switch, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribe } from "../../redux/actions/settingActions";
import { useDispatch } from "react-redux";
import { notify } from "../../utils/HelperFunctions";
import SettingCard from "../../components/cards/SettingCard";
import ThemeBtn from "../../components/common/themeBtn";
import NotificationSwitch from "../../components/common/NotificationSwitch";

function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkTheme, setDarkTheme] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load initial permission status
  useEffect(() => {
    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  }, []);


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
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      setNotificationsEnabled(false);
      return;
    }

    if (notificationsEnabled) {
      // Switch turned OFF → revoke subscription
      dispatch(subscribe(false)).then((msg) => notify("success", msg));
      setNotificationsEnabled(false);
    } else {
      // Switch turned ON → ask permission
      if (Notification.permission === "granted") {
        // Already granted → just save subscription
        dispatch(subscribe(true)).then((msg) => notify("success", msg));
        setNotificationsEnabled(true);
      } else if (Notification.permission === "denied") {
        alert("You have denied notification permission. Please enable it in browser settings.");
        setNotificationsEnabled(false);
      } else {
        // Request permission
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            dispatch(subscribe(true)).then((msg) => notify("success", msg));
            setNotificationsEnabled(true);
          } else {
            setNotificationsEnabled(false);
            notify("error", "Notification permission denied");
          }
        });
      }
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

      {/* ---------------- UPDATE PROFILE ---------------- */}


      {/* ---------------- NOTIFICATIONS ---------------- */}
      <SettingCard
        title="Notifications"
        desc="Get alerts for deadlines, quizzes, and announcements"
        action={
          <NotificationSwitch
            checked={notificationsEnabled}
            onChange={handleNotification}
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
          p: 3,
          mb: 3,
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
          p: 3,
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
