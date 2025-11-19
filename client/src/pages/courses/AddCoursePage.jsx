import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Button,
    Paper,
    Select
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const categories = [
    "Data Management",
    "Web Development",
    "Design",
    "AI & ML",
    "Business",
];

export default function AddCoursePage() {
    const [coverPreview, setCoverPreview] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Box sx={{ p: 2, width: "100%", mx: "auto" }}>
            {/* Course Information */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                Course Information
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>

                {/* LEFT SIDE FORM */}
                <Box>
                    {/* Title */}
                    <input type="text" placeholder='Search your course' style={{
                        outline: "none",
                        background: "#fff",
                        border: "2px solid var(--primary-color)",
                        borderRadius: "5px",
                        marginBottom: 10,
                        padding: "5px 10px",
                        width: "100%",
                        height: "34px"
                    }} />

                    {/* Category */}
                    <Select
                        fullWidth
                        label="Category"
                        size="small"
                        sx={{ mb: 2, bgcolor: "#fff", px: "20px", border: "none", color: "var(--text-color)", height: "40px", fontSize: "14px" }}
                        defaultValue={"Data Management"}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Description */}
                    <Typography sx={{ fontSize: "14px", mb: 1 }}>Description</Typography>
                    <textarea cols={10} rows={10} type="text" placeholder='Search your course' style={{
                        outline: "none",
                        background: "#fff",
                        // border: "2px solid var(--primary-color)",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "100%",
                    }} />
                </Box>

                {/* RIGHT SIDE — COVER IMAGE */}
                <Box>
                    <Typography sx={{ mb: 1 }}>Cover Image</Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            border: "2px dashed #bfc6d1",
                            height: "250px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            overflow: "hidden",
                            position: "relative",
                        }}
                        onClick={() => document.getElementById("coverUpload").click()}
                    >
                        {!coverPreview ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "center",
                                    color: "#6b7280",
                                }}
                            >
                                <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography>Upload</Typography>
                            </Box>
                        ) : (
                            <img
                                src={coverPreview}
                                alt="Cover Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        )}
                    </Paper>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        id="coverUpload"
                        style={{ display: "none" }}
                        onChange={handleCoverUpload}
                    />
                </Box>
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button sx={{

                    padding: " 5px 10px",
                    width: "160px",
                    height: "35px",
                    border: "3px solid #6299dcff",
                    borderRadius: "5px",
                    background: "var(--secondary-color)",
                    color: "#fff",
                    transition: "0.3s all ease-in-out",
                    //    fontSize: "12px",
                    textTransform: "capitalize",
                    ":hover": {
                        backgroundColor: "#1258ad",
                    }
                }}>
                    Draft
                </Button>
                <Button sx={{

                    padding: " 5px 10px",
                    width: "160px",
                    height: "35px",
                    border: "3px solid #1258ad",
                    borderRadius: "5px",
                    background: "var(--primary-color)",
                    color: "#fff",
                    transition: "0.3s all ease-in-out",
                    //    fontSize: "12px",
                    textTransform: "capitalize",
                    ":hover": {
                        backgroundColor: "#1258ad",
                    }
                }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
