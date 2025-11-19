import { Box, Tabs, Tab, Typography, Button, TextField, Switch, FormControlLabel, Divider } from "@mui/material";
import React from "react";
import UpdateProfileForm from "../../components/forms/UpdateProfileForm";

function Setting() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "var(--bg-color)",
                padding: "20px",
            }}
        >
            {/* PAGE TITLE */}
            <Typography variant="h4" fontWeight="bold" sx={{ color: "var(--text-color)", mb: 3 }}>
                Settings
            </Typography>


          <Box sx={{ position: "relative", display: "flex", gap: "25px", mt: 1 }}>

    {/* Tabs */}
    {[
        { id: 0, label: "Profile", width: "60px" },
        { id: 1, label: "Notifications", width: "100px" },
        { id: 2, label: "Delete Account", width: "110px" },
    ].map((tab) => (
        <Box
            key={tab.id}
            onClick={() => setValue(tab.id)}
            sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                // width: tab.width,
                textAlign: "center",
                padding: "5px 5px 10px 5px",
                color: value === tab.id ? "var(--text-color)" : "#8383839c",
                position: "relative",
                zIndex: 2,
                transition: "color 0.2s ease",
            }}
        >
            {tab.label}
        </Box>
    ))}

    {/* Sliding Underline */}
    <Box
        sx={{
            position: "absolute",
            bottom: "-2px",
            left:
                value === 0 ? "0px" :
                value === 1 ? "80px" :
                value === 2 ? "205px" : "0px",

            width:
                value === 0 ? "60px" :
                value === 1 ? "100px" :
                value === 2 ? "110px" : "60px",

            height: "5px",
            borderRadius: "10px 10px 0 0",
            backgroundColor: "var(--primary-color)",
            transition: "all 0.35s ease",
            zIndex: 1,
        }}
    />
</Box>

            <Divider />

            {/* TAB CONTENT */}
            <Box sx={{ mt: 4 }}>

                {/* ---------------- PROFILE TAB ---------------- */}
                {value === 0 && (
                    <UpdateProfileForm />
                )}

                {/* ---------------- NOTIFICATIONS TAB ---------------- */}
                {value === 1 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: "var(--text-color)" }}>
                            Notification Preferences
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <FormControlLabel control={<Switch />} label="Email Notifications" />
                            <FormControlLabel control={<Switch />} label="Course Updates" />
                            <FormControlLabel control={<Switch />} label="Assignment Alerts" />
                            <FormControlLabel control={<Switch />} label="Message Notifications" />

                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "var(--primary-color)", textTransform: "none", width: "fit-content", mt: 2 }}
                            >
                                Save Preferences
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* ---------------- DELETE ACCOUNT TAB ---------------- */}
                {value === 2 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: "var(--text-color)" }}>
                            Delete Account
                        </Typography>

                        <Typography sx={{ mb: 3, color: "red" }}>
                            Warning: This action is permanent and cannot be undone.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "red",
                                color: "#fff",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#cc0000" },
                            }}
                        >
                            Delete My Account
                        </Button>
                    </Box>
                )}

                {/* ---------------- LOGOUT TAB ---------------- */}
                {value === 3 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: "var(--text-color)" }}>
                            Logout
                        </Typography>

                        <Typography sx={{ mb: 3 }}>
                            Click below if you want to logout from your account.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "var(--secondary-color)",
                                textTransform: "none",
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                )}

            </Box>
        </Box>
    );
}

export default Setting;
