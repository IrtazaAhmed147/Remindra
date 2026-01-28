import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllResourceAction, getCourseResourcesAction } from '../../redux/actions/resourceActions';
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

function ImagesTabPage() {

    const dispatch = useDispatch()
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const [isModal, setIsModal] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const { resources, isLoading: resourcesLoading } = useSelector((state) => state.resource)
    const { singleCourse, } = useSelector((state) => state.course)
    const { user } = useSelector((state) => state.auth)
    const { courseId } = useParams()


    useEffect(() => {
        dispatch(getCourseResourcesAction(courseId, 'image')).then((msg) => console.log(msg)).catch((msg) => notify("error", msg))
    }, [])
    const handleDeleteResources = () => {
        dispatch(deleteAllResourceAction(courseId))
            .then((msg) => {
                dispatch(getCourseResourcesAction(courseId, 'image')).catch((msg) => notify("error", msg))
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


    // const fetchMoreData = () => {
    //     const newSkip = skipNo + 20;
    //     setSkipNo(newSkip);

    //     dispatch(getAllProducts(newSkip)).then((response) => {
    //         if (response?.payload?.products) {
    //             setAllProducts(prevProducts => [
    //                 ...prevProducts,
    //                 ...response.payload.products
    //             ]);
    //         }
    //     }).then(() => setError("")).catch((error) => setError(error.message))
    // };

    return (

        <>
            <Box>
                <Box sx={{ position: "sticky", top: 0, backgroundColor: "var(--bg-color)", display: "flex", mb: 2, justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
                    <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                        Images  {`(${resources.length})`}
                    </Typography>

                    {isOwner && <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        {resources?.length > 0 && (
                            <>
                               {(selectedIds.length > 0) && <Button
                                    disabled={selectedIds.length === 0}
                                    onClick={downloadSelected}
                                    sx={{
                                        textTransform: "none",
                                        px: 3,
                                        py: 1,
                                        borderRadius: "10px",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        bgcolor: "var(--primary-color)",
                                        color: "#fff",
                                        boxShadow: "0 2px 6px rgba(42,125,225,0.35)",
                                        "&:hover": {
                                            bgcolor: "var(--primaryHover-color)",
                                            boxShadow: "0 4px 12px rgba(42,125,225,0.45)"
                                        },
                                    }}
                                >
                                    Download Selected
                                </Button>}

                                <Button sx={{ minWidth: "auto", bgcolor: "red", borderRadius: "50%", color: "#fff" }} onClick={() => setIsModal(true)}>
                                    <DeleteIcon />
                                </Button>
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
                        <GradientBtn icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />} text="Add Images" url={`/add/resources/image/${courseId}`} />
                    </Box>}
                </Box>

                {resourcesLoading ? (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "250px" }}>
                        <CircularProgress sx={{ color: "var(--text-color)" }} size="30px" />
                    </Box>
                ) : (


                    //  <InfiniteScroll
                    //                     dataLength={resources?.length}
                    //                     next={fetchMoreData}
                    //                     hasMore={resources?.length < total}
                    //                     loader={<div className="loader-container"><CircularProgress  sx={{color:"var(--text-color)"}} /></div>}
                    //                     endMessage={
                    //                         <p style={{ textAlign: 'center' }}>
                    //                             <b>Yay! You have seen it all</b>
                    //                         </p>
                    //                     }
                    //                     scrollThreshold={0.9}
                    //                 >
                    //                     <div className='flex flex-wrap gap-[3px] md:gap-1 p-2'>
                    //                         {resources?.map((item) => (
                    //                          <PhotoView src={resource.fileUrl} key={index}>
                    // <Box
                    //     component="img"
                    //     src={resource.fileUrl}
                    //     sx={{
                    //         width: { xs: "30%", sm: "23%", md: "23%" },
                    //         maxHeight: 200,
                    //         objectFit: "cover",
                    //         borderRadius: "12px",
                    //         cursor: "pointer",
                    //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    //         transition: "0.2s",
                    //         "&:hover": { transform: "scale(1.03)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                    //     }}
                    // />
                    //         </PhotoView>
                    //                         ))}
                    //                     </div >
                    //                 </InfiniteScroll>

                    <PhotoProvider>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {resources.map((resource) => (
                                <Box
                                    key={resource._id}
                                    sx={{ position: "relative", width: { xs: "30%", sm: "23%", md: "23%" } }}
                                    onMouseEnter={() => setHoveredId(resource._id)}
                                    onMouseLeave={() => setHoveredId(null)}
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

                )
                }
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