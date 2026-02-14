import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { timeAgo } from "../../utils/HelperFunctions";

function InvitationCard({ courseId, senderId, msg, updatedAt ,responseHandle, _id}) {
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
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Box
                    component="img"
                    src={
                        senderId?.profilePic ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />

                <Box>
                    <Typography
                        sx={{ fontSize: "14px", fontWeight: 600, color: "#1f1f1f" }}
                    >
                        {senderId?.username}{" "}
                        <span style={{ fontWeight: 400, color: "var(--noti-msg-color)" }}>
                            {msg}
                        </span>{" "}
                        <span style={{ fontWeight: 600 }}>
                            {courseId?.title}
                        </span>
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: "#9e9e9e",
                            mt: 0.2,
                        }}
                    >
                        {time} {time !== 'just now' && 'ago'}
                    </Typography>
                </Box>
            </Box>

            {/* RIGHT SECTION */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                onClick={()=> responseHandle(_id, 'reject')}
                    size="small"
                    sx={{
                        minWidth: "80px",
                        height: "32px",
                        borderRadius: "6px",
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#9a0007",
                        },
                    }}
                >
                    Reject
                </Button>

                <Button
                onClick={()=> responseHandle(_id, 'accept')}
                    size="small"
                    sx={{
                        minWidth: "80px",
                        height: "32px",
                        borderRadius: "6px",
                        backgroundColor: "#2e7d32",
                        color: "#fff",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#1b5e20",
                        },
                    }}
                >
                    Accept
                </Button>
            </Box>
        </Box>
    );
}

export default InvitationCard;
