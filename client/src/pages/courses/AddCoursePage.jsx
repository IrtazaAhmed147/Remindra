import React, { useState } from "react";
import {
    Box,
    Typography,
    MenuItem,
    Button,
    Paper,
    Select
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const categories = [
    "Select Category",
    "Data Management",
    "Web Development",
    "Design",
    "AI & ML",
    "Business",
];

export default function AddCoursePage() {

    return (
        <Box sx={{ p: 2, width: "100%", minHeight:"100vh",mx: "auto" }}>
            
            {/* Heading */}
            <Typography
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text-color)"
                }}
            >
                Create New Course
            </Typography>

            <Box
            >
                {/* LEFT COLUMN */}
                <Box>
                    {/* Course Title */}
                    <Typography sx={{ mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Course Title
                    </Typography>
                    <input
                        type="text"
                        placeholder="Enter course title"
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "8px 12px",
                            width: "100%",
                            height: "36px",
                            fontSize: "13px"
                        }}
                    />

                    {/* Category */}
                    <Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Select Category
                    </Typography>
                    <Select
                        fullWidth
                        size="small"
                        defaultValue={"Select Category"}
                        sx={{
                            bgcolor: "#fff",
                            fontSize: "13px",
                            height: "40px",
                            borderRadius: "6px",
                        }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat} sx={{ fontSize: "13px" }}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Description */}
                    <Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Description
                    </Typography>
                    <textarea
                        rows={7}
                        placeholder="Write something about your course..."
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "10px 12px",
                            width: "100%",
                            fontSize: "13px",
                            resize: "vertical",
                        }}
                    ></textarea>
                </Box>

                
            </Box>

            {/* ACTION BUTTONS */}
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                    sx={{
                        px: 2,
                        width: "150px",
                        height: "35px",
                        borderRadius: "6px",
                        border: "2px solid #6299dc",
                        background: "var(--secondary-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontSize: "13px",
                        ":hover": { backgroundColor: "#4d84d1" },
                    }}
                >
                    Save as Draft
                </Button>

                <Button
                    sx={{
                        px: 2,
                        width: "150px",
                        height: "35px",
                        borderRadius: "6px",
                        border: "2px solid #1258ad",
                        background: "var(--primary-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontSize: "13px",
                        ":hover": { backgroundColor: "#1258ad" },
                    }}
                >
                    Publish Course
                </Button>
            </Box>
        </Box>
    );
}
