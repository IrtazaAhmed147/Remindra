import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { timeAgo } from "../../utils/HelperFunctions";

function NotificationCard({ title, message, updatedAt }) {
    const time = timeAgo(updatedAt);

    return (
        <Box
            sx={{
                mt: 1,
                p: 1.5,
                backgroundColor: "var(--card-bg-color)",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.2s",
                "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                },
            }}
        >
            {/* LEFT SECTION */}
            <Box >
                    <Typography sx={{ fontSize: {xs:"16px",md:"18px"}, fontWeight: 'bold', color: "#000" }}>
                        {title}
                    </Typography>
                <Box>
                    <Typography
                        sx={{ fontSize: {xs:"13px",md:"14px"}, fontWeight: 600, color: "#1f1f1f" }}
                    >
                      
                      {message}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {xs:"11px",md:"12px"},
                            color: "#9e9e9e",
                            mt: 0.2,
                        }}
                    >
                        {time} {time !== 'just now' && 'ago'}
                    </Typography>
                </Box>
            </Box>
            
        </Box>
    );
}

export default NotificationCard;
