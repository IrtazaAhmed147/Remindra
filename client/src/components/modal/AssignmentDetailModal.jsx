import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    Divider
} from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const AssignmentDetailModal = ({ open, handleClose, assignment }) => {

    const images = assignment?.attachments?.filter(file => file.mimetype?.startsWith("image"));
    const pdfs = assignment?.attachments?.filter(file => file.mimetype === "application/pdf");
    const txtFiles = assignment?.attachments?.filter(file => file.mimetype === "text/plain");

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    background: "var(--card-bg-color)",
                    borderRadius: "18px",
                    minWidth: {xs:"90%",sm:"60%",md:"60%"},
                    margin:0,
                    p: 1,
                },
            }}
        >

            {/* Header */}
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "var(--text-color)",
                    pb: 1,
                    px:1
                }}
            >
                {assignment?.title}
            </DialogTitle>

            <Divider sx={{ opacity: 0.2 }} />

            <DialogContent sx={{ mt: 1,px:1 }}>

                {/* Meta Info */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        mb: 3,
                        p: 0,
                        borderRadius: 2,
                        background: "rgba(0,0,0,0.03)",
                    }}
                >
                    <Typography sx={{ fontSize: 14 }}>
                        <strong>Due Date:</strong> {assignment?.dueDate}
                    </Typography>

                    <Typography sx={{ fontSize: 14 }}>
                        <strong>Attachments:</strong>{" "}
                        {assignment?.attachments?.length || 0}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 17,
                        mb: 1,
                        color: "var(--text-color)",
                    }}
                >
                    Description
                </Typography>

                <Typography
                    sx={{
                        mb: 4,
                        lineHeight: 1.8,
                        fontSize: 15,
                        color: "gray",
                        whiteSpace: "pre-line"
                    }}
                >
                    {assignment?.description}
                </Typography>

                {/* Images Section */}
                {images?.length > 0 && (
                    <>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                            Images
                        </Typography>

                        <PhotoProvider>
                            <Grid container spacing={2}>
                                {images.map((img, idx) => (
                                    <Grid item xs={6} sm={4} md={3} key={idx}>
                                        <PhotoView src={img.url}>
                                            <Box
                                                component="img"
                                                src={img.url}
                                                sx={{
                                                    width: "100%",
                                                    height: 140,
                                                    objectFit: "cover",
                                                    borderRadius: 3,
                                                    cursor: "pointer",
                                                    transition: "0.3s",
                                                    "&:hover": {
                                                        transform: "scale(1.05)"
                                                    }
                                                }}
                                            />
                                        </PhotoView>
                                    </Grid>
                                ))}
                            </Grid>
                        </PhotoProvider>
                    </>
                )}

                {/* PDF Section */}
                {pdfs?.length > 0 && (
                    <>
                        <Typography sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
                            PDF Files
                        </Typography>

                        {pdfs.map((pdf, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    mb: 3,
                                    height: 500,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                                }}
                            >
                                <iframe
                                    src={pdf.url}
                                    width="100%"
                                    height="100%"
                                    style={{ border: "none" }}
                                    title={pdf.name || `PDF ${idx + 1}`}
                                />
                            </Box>
                        ))}
                    </>
                )}

                {/* Text Files */}
                {txtFiles?.length > 0 && (
                    <>
                        <Typography sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
                            Text Files
                        </Typography>

                        {txtFiles.map((txt, idx) => (
                            <Button
                                key={idx}
                                variant="outlined"
                                href={txt.url}
                                target="_blank"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 2,
                                    mb: 1
                                }}
                            >
                                {txt.name || `View File ${idx + 1}`}
                            </Button>
                        ))}
                    </>
                )}

            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3
                    }}
                >
                    Close
                </Button>
            </DialogActions>

        </Dialog>
    );
};


export default AssignmentDetailModal;
