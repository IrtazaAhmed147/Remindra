import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { uploadResourceAction } from '../../redux/actions/resourceActions';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../../utils/HelperFunctions';
import FileCard from '../../components/cards/FileCard';
function AddResource() {

    const form = useRef({})
    const { type } = useParams();

    const [coverFiles, setCoverFiles] = useState([]);
    const [coverPreviews, setCoverPreviews] = useState([]);
    const { courseId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useSelector((state) => state.resource)

    const uploadFiles = async () => {
        const formData = new FormData();
        if (coverFiles.length > 20 && type === 'image') {

            notify("error", "You can upload a maximum of 20 images at one time.")
            return;
        } else if (coverFiles  > 5 && type === 'file' ) {
            notify("error", "You can upload a maximum of 5 files at one time.")
            return;


        }
        coverFiles.forEach((file, index) => {
            formData.append("materials", file);
        });


        dispatch(uploadResourceAction(courseId, formData)).then((msg) => {
            notify("success", msg)
            navigate(`/course/${courseId}/${type}`)
        })

    }
    const handleCoverUpload = (e) => {
        const files = Array.from(e.target.files);

        const previews = files.map(file => ({
            url: URL.createObjectURL(file),
            isOld: false
        }));

        setCoverFiles(prev => [...prev, ...files]);
        setCoverPreviews(prev => [...prev, ...previews]);

    };

    const removeImage = (index) => {

        const removed = coverPreviews[index];
        setCoverPreviews(prev => prev.filter((_, i) => i !== index));
        if (!removed.isOld) {
            setCoverFiles(prev => prev.slice(0, prev.length - 1));
        }
    };
    return (
        <>
            <Box sx={{ p: 2, width: "100%", mx: "auto", minHeight: "100vh" }}>
                <Typography
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "var(--text-color)"
                    }}
                >
                    Add {type === 'image' ? "Images" : "files"}
                </Typography>



                <Box sx={{ width: "100%", }}>
                    <Typography sx={{ mb: 1 }}>Upload Files</Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            border: "2px dashed #bfc6d1",
                            minHeight: "250px",
                            borderRadius: "10px",
                            padding: 1,
                            cursor: "pointer",
                            bgcolor: "var(--card-bg-color)"
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
                                <Typography>Upload {type === 'image' ? "Images" : "files"}</Typography>
                                <Typography sx={{ fontSize: "12px" }}>
                                    (You can upload multiple files)
                                </Typography>
                            </Box>
                        ) : type === 'image' ? (
                            <>  <Box
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
                                            width: { xs: "31%", sm: "31%", md: "20%" },
                                            maxHeight: "150px",
                                            position: "relative",
                                            boxShadow: "2px 2px 10px 3px #ddd"
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
                                            src={img?.url}
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
                            </Box> </>
                        ) : <Box> {coverFiles?.map((file, index) => (
                            <FileCard key={index} fileName={file.name} fileSize={file.size} isDownloadBtn={false} />
                        ))} </Box>}
                    </Paper>

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept={
                            type === "image"
                                ? "image/*"
                                : ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                        } multiple
                        id="coverUpload"
                        style={{ display: "none" }}
                        onChange={handleCoverUpload}
                    />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Button
                        disabled={isLoading}
                        onClick={() => uploadFiles()}
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
                        Upload
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default AddResource