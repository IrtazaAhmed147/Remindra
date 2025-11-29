import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Button,
    Paper,
    IconButton,
    Select
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const courses = ["Select Course", "OOP", "Database", "Linear", "Calculus"];

export default function AddQuizPage() {
    const [coverFiles, setCoverFiles] = useState([]);
    const [coverPreviews, setCoverPreviews] = useState([]);

    const handleCoverUpload = (e) => {
        const files = Array.from(e.target.files);

        const newFiles = [...coverFiles, ...files];
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

        setCoverFiles(newFiles);
        setCoverPreviews(newPreviews);
    };

    const removeImage = (index) => {
        const updatedFiles = [...coverFiles];
        const updatedPreviews = [...coverPreviews];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setCoverFiles(updatedFiles);
        setCoverPreviews(updatedPreviews);
    };

    return (
        <Box sx={{ p: 2, width: "100%", mx: "auto",minHeight:"100vh" }}>
            {/* Heading */}
            <Typography
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text-color)"
                }}
            >
                Create Quiz
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    width:"100%",
                    flexWrap:"wrap",
                    gap: 4,
                }}
            >
                {/* LEFT SIDE */}
                <Box sx={{width:{xs:"100%",sm:"48%",md:"48%"}}}>
                    {/* Quiz Name */}
                    <Typography sx={{ mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Quiz Title
                    </Typography>
                    <input
                        type="text"
                        placeholder="Enter title"
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            width: "100%",
                            height: "34px",
                            fontSize: "13px"
                        }}
                    />

                    {/* Course Dropdown */}
                    <Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Select Course
                    </Typography>
                    <Select
                        fullWidth
                        size="small"
                        sx={{
                            mb: 2,
                            bgcolor: "#fff",
                            fontSize: "13px",
                            borderRadius: "6px",
                            height: "40px",
                        }}
                        defaultValue={"Select Course"}
                    >
                        {courses.map((cat) => (
                            <MenuItem key={cat} value={cat} sx={{ fontSize: "13px" }}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Task Input */}
                    <Typography sx={{ mt: 1, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Task
                    </Typography>
                    <textarea
                        rows={6}
                        placeholder="Write Quiz task..."
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "8px 10px",
                            width: "100%",
                            fontSize: "13px",
                        }}
                    ></textarea>
                </Box>

                {/* RIGHT SIDE — MULTIPLE IMAGES */}
                <Box sx={{width:{xs:"100%",sm:"48%",md:"48%"}}}>
                    <Typography sx={{ mb: 1 }}>Upload Images</Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            border: "2px dashed #bfc6d1",
                            minHeight: "250px",
                            borderRadius: "10px",
                            padding: 1,
                            cursor: "pointer",
                            background: "#f8fafc",
                        }}
                        onClick={() => document.getElementById("coverUpload").click()}
                    >
                        {coverPreviews.length === 0 ? (
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#6b7280"
                                }}
                            >
                                <CloudUploadIcon sx={{ fontSize: 40 }} />
                                <Typography>Upload Images</Typography>
                                <Typography sx={{ fontSize: "12px" }}>
                                    (You can upload multiple images)
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {coverPreviews.map((img, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "48%",
                                            height: "140px",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Remove Button */}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                background: "#fff",
                                                borderRadius: "50%",
                                                boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>

                                        {/* Image */}
                                        <img
                                            src={img}
                                            alt="preview"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="coverUpload"
                        style={{ display: "none" }}
                        onChange={handleCoverUpload}
                    />
                </Box>
            </Box>

            {/* BUTTONS */}
            <Box sx={{ mt: 4 }}>
                <Button
                    sx={{
                        padding: " 5px 10px",
                        width: "160px",
                        height: "35px",
                        borderRadius: "5px",
                        background: "var(--primary-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontSize: "13px",
                        ":hover": {
                            backgroundColor: "#1258ad",
                        }
                    }}
                >
                    Create Quiz
                </Button>
            </Box>
        </Box>
    );
}
