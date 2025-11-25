import { Box, Typography, Button, Switch, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        padding: { xs: "10px", sm: "20px", md: "30px" },
        pt:"5px !important",
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
      <Box
        onClick={() => navigate("/update/profile/123")}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          cursor: "pointer",
          transition: "0.2s all",
          "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.12)" },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}
        >
          Update Profile
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, color: "#555", mt: 0.5 }}
        >
          Click to update your profile information.
        </Typography>
      </Box>

      {/* ---------------- NOTIFICATIONS ---------------- */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 1 }}
        >
          Notification Access
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, color: "#555", mb: 1 }}
        >
          Allow this app to send you notifications about assignments, quizzes, and announcements.
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              color="primary"
            />
          }
          label="Enable Notifications"
          sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }}
        />
      </Box>

      {/* ---------------- DELETE ACCOUNT ---------------- */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ mb: 1, color: "var(--text-color)", fontSize: { xs: 13, sm: 14, md: 15 } }}
        >
          Delete Account
        </Typography>
        <Typography
          sx={{ mb: 2, color: "red", fontSize: { xs: 12, sm: 13, md: 14 } }}
        >
          Warning: This action is permanent and cannot be undone.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#cc0000" },
            fontSize: { xs: 12, sm: 13, md: 14 },
          }}
        >
          Delete My Account
        </Button>
      </Box>
    </Box>
  );
}

export default Setting;
