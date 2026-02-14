import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllResourceAction, deleteSelectedResourceAction, getCourseResourcesAction } from '../../redux/actions/resourceActions';
import { useParams } from 'react-router-dom';
import { handleDownloadAll } from '../../redux/actions/courseActions';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import RemoveModal from '../../components/modal/RemoveModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GradientBtn from "../../components/common/GradientBtn";
import "react-photo-view/dist/react-photo-view.css";
import { notify } from '../../utils/HelperFunctions';
import InfiniteScroll from 'react-infinite-scroll-component';
import FullPageLoader from '../../components/loader/FullPageLoader';

function ImagesTabPage() {

    const dispatch = useDispatch()
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [images, setImages] = useState([]);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pressTimer, setPressTimer] = useState(null);



    const [isModal, setIsModal] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const { resources, resourceLoading, deleteResourceLoading } = useSelector((state) => state.resource)
    const { singleCourse, } = useSelector((state) => state.course)
    const { user } = useSelector((state) => state.auth)
    const { courseId } = useParams()
    useEffect(() => {
        loadImages(0);
    }, []);

    const handleDeleteResources = () => {
        dispatch(deleteAllResourceAction(courseId))
            .then((msg) => {
                dispatch(getCourseResourcesAction(courseId, 'image', 0, 20)).then(() => setImages(resources)).catch((msg) => notify("error", msg))
                notify("success", msg);
            })
            .catch((err) => notify("error", err));
    };
    const isOwner = singleCourse?.owner?._id === user?._id;

    const showCheckbox = (id) =>
        hoveredId === id || selectedIds.length > 0;


    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleTouchStart = (id) => {
        const timer = setTimeout(() => {
            setHoveredId(id)
        }, 500);
        setPressTimer(timer)
    }
    const handleTouchEnd = () => {
        clearTimeout(pressTimer);
    };

    const downloadSelected = async () => {
        setDownloadLoading(true);
        try {

            await handleDownloadAll(singleCourse?.title?.replace(/\s+/g, "_")
                .replace(/[()]/g, "")
                .replace(/[^a-zA-Z0-9_.-]/g, ""), courseId, selectedIds);
        } catch (err) {
            console.error(err);
        }
        setDownloadLoading(false);

    };

    const loadImages = async (newSkip) => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await dispatch(
                getCourseResourcesAction(courseId, "image", newSkip, 20)
            );
            setImages((prev) => {
                return newSkip === 0 ? data?.resourcesData : [...prev, ...data?.resourcesData]
            });

            setTotal(data?.total);
            setSkip(newSkip + 20);
        } catch (err) {
            notify("error", err);
        }
        setLoading(false);
    };

    const handleDeleteSelected = async () => {
        try {
            const msg = await dispatch(
                deleteSelectedResourceAction(selectedIds)
            );
            notify("success", msg);

            setImages((prev) =>
                prev.filter((img) => !selectedIds.includes(img._id))
            );
            setSelectedIds([]);
        } catch (err) {
            notify("error", err);
        }
    };

    return (

        <>
            <Box>
                {deleteResourceLoading && <FullPageLoader />}
                <Box sx={{ position: "sticky", p: 1, zIndex: 99, top: 0, backgroundColor: "var(--bg-color)", display: "flex", mb: 2, justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
                    <Typography fontWeight="bold" sx={{ color: "#334155", fontSize: { xs: "18px", sm: "20px", md: "24px" } }}>
                        Images  {`(${total})`}
                    </Typography>

                    {<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        {resources?.length > 0 && (
                            <>

                                {isOwner && <Button sx={{ minWidth: "auto", bgcolor: "red", borderRadius: "50%", color: "#fff" }} onClick={() => setIsModal(true)} disabled={deleteResourceLoading}>
                                    <DeleteIcon />
                                </Button>}
                                <Button disabled={downloadLoading} onClick={async () => {
                                    setDownloadLoading(true);
                                    try {
                                        await handleDownloadAll(singleCourse?.title, courseId);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                    setDownloadLoading(false);
                                }} sx={{ minWidth: "auto", bgcolor: "var(--primary-color)", borderRadius: "50%", color: "#fff" }}>
                                    <ArrowDownwardIcon />
                                </Button>
                            </>
                        )}
                        {isOwner && <GradientBtn icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />} text="Add Images" url={`/add/resources/image/${courseId}`} />}
                    </Box>}
                </Box>



                <InfiniteScroll
                    dataLength={images?.length}
                    next={() => loadImages(skip)}
                    hasMore={images?.length < total}
                    loader={
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70px" }}>
                            <CircularProgress sx={{ color: "var(--text-color)" }} />
                        </Box>
                    }

                    scrollThreshold={0.9}
                >

                    <PhotoProvider>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {images.map((resource) => (
                                <Box
                                    key={resource._id}
                                    sx={{ position: "relative", width: { xs: "30%", sm: "23%", md: "23%" } }}
                                    onMouseEnter={() => setHoveredId(resource._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onTouchStart={() => handleTouchStart(resource._id)}
                                    onTouchEnd={handleTouchEnd}

                                >
                                    {showCheckbox(resource._id) && (
                                        <input

                                            type="checkbox"
                                            checked={selectedIds.includes(resource._id)}
                                            onChange={() => toggleSelect(resource._id)}
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10,
                                                zIndex: 10,
                                                transform: "scale(1.5)"
                                            }}
                                        />
                                    )}

                                    <PhotoView src={resource.fileUrl}>
                                        <Box
                                            component="img"
                                            src={resource.fileUrl}
                                            sx={{
                                                width: "100%",
                                                maxHeight: 200,
                                                objectFit: "cover",
                                                borderRadius: "12px",
                                                cursor: "pointer",
                                                border: selectedIds.includes(resource._id)
                                                    ? "2px solid var(--primary-color)"
                                                    : "2px solid transparent",
                                            }}
                                        />
                                    </PhotoView>
                                </Box>
                            ))}
                        </Box>
                    </PhotoProvider>
                </InfiniteScroll>


                {selectedIds.length > 0 && (
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: 20,
                            left: 0,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            zIndex: 200,
                            px: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "center",
                                justifyContent: "center",
                                width: { xs: "100%", sm: "auto" },
                                backdropFilter: "blur(12px)",
                                background: "rgba(255,255,255,0.9)",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                                borderRadius: 4,
                                p: {xs:1,sm:2,md:2},
                            }}
                        >
                            {/* Selected Count */}
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: "#555",
                                }}
                            >
                                {selectedIds.length} Selected
                            </Typography>

                            {/* Delete Button */}
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteSelected}
                                sx={{
                                    fontSize:{xs:"12px",sm:"14px",md:"16px"},
                                    textTransform: "none",
                                    borderRadius: 3,
                                    px: 3,
                                    fontWeight: 600,
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                Delete Selected
                            </Button>

                            {/* Download Button */}
                            <Button
                                variant="contained"
                                onClick={downloadSelected}
                                sx={{
                                    fontSize:{xs:"12px",sm:"14px",md:"16px"},
                                    textTransform: "none",
                                    borderRadius: 3,
                                    px: 3,
                                    fontWeight: 600,
                                    bgcolor: "var(--primary-color)",
                                    "&:hover": {
                                        bgcolor: "var(--primaryHover-color)",
                                    },
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                Download Selected
                            </Button>
                        </Box>
                    </Box>
                )}


            </Box >



            {isModal && (
                <RemoveModal
                    open={isModal}
                    onClose={() => setIsModal(false)}
                    title={"Delete All Photos"}
                    description={""}
                    onConfirm={() => {
                        handleDeleteResources();
                        setIsModal(false);
                    }}
                />
            )}
        </>
    )
}

export default ImagesTabPage