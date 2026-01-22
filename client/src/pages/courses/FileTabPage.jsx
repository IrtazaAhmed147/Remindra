import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GradientBtn from '../../components/common/GradientBtn';
import FileCard from '../../components/cards/FileCard';
import {  deleteResourceAction, getCourseResourcesAction } from '../../redux/actions/resourceActions';
import RemoveModal from '../../components/modal/RemoveModal';
import { notify } from '../../utils/HelperFunctions';

function FileTabPage() {

    const dispatch = useDispatch()
    const [removeModalState, setRemoveModalState] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [downloadLoading, setDownloadLoading] = useState(false)
    const { resources, isLoading: resourcesLoading } = useSelector((state) => state.resource)
    const { singleCourse, } = useSelector((state) => state.course)
    const { user } = useSelector((state) => state.auth)
    const { courseId } = useParams()


    useEffect(() => {
        dispatch(getCourseResourcesAction(courseId, 'file')).then((msg) => console.log(msg)).catch((msg) => notify(msg))
    }, [])

    const handleDownload = (fileUrl, originalName) => {
        const safeName = originalName.replace(/\s+/g, "_")
            .replace(/[()]/g, "")
            .replace(/[^a-zA-Z0-9_.-]/g, "");
        const splitName = safeName.split(".");

        const downloadUrl = fileUrl.replace(
            "/upload/",
            `/upload/fl_attachment:${splitName[0]}/`
        );


        window.location.href = downloadUrl;
    }
    const handleDeleteResources = (id) => {
        dispatch(deleteResourceAction(id, courseId))
            .then((msg) => {
                dispatch(getCourseResourcesAction(courseId, 'file'));
                notify("success", msg);
            })
            .catch((err) => notify("error", err));
    };

    const isOwner = singleCourse?.owner?._id === user?._id;

    return (
        <>



            <Box sx={{ position: "sticky", top: 0, backgroundColor: "var(--bg-color)", display: "flex", mb: 2, justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
                <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                    Files  {`(${resources.length})`}

                </Typography>

                {isOwner && <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {resources?.length == 0 && (
                        <>
                            <Button sx={{ minWidth: "auto", bgcolor: "red", borderRadius: "50%", color: "#fff" }} >
                                <DeleteIcon />
                            </Button>
                            <Button disabled={downloadLoading} onClick={async () => {
                                setDownloadLoading(true);
                                try {
                                    // await handleDownloadAll(courseId);
                                } catch (err) {
                                    console.error(err);
                                }
                                setDownloadLoading(false);
                            }} sx={{ minWidth: "auto", bgcolor: "var(--primary-color)", borderRadius: "50%", color: "#fff" }}>
                                <ArrowDownwardIcon />
                            </Button>
                        </>
                    )}
                    <GradientBtn icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />} text="Add Files" url={`/add/resources/file/${courseId}`} />
                </Box>}


            </Box>
            {resourcesLoading ? (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "250px" }}>
                    <CircularProgress  sx={{color:"var(--text-color)"}} size="30px" />
                </Box>
            ) : (<>

                <Box width={'100%'}> {resources?.map((item, i) => (


                    <FileCard key={item?._id} {...item} isDownloadBtn={true}
                        handleDownload={handleDownload}
                        askDelete={(id) => {
                            setSelectedCourseId(id);
                            setRemoveModalState(true);
                        }} />
                ))}
                </Box>
            </>)
            }


            {removeModalState && <RemoveModal
                open={removeModalState}
                onClose={() => setRemoveModalState(false)}
                onConfirm={() => {
                    // deleteCourse(selectedCourseId);
                    handleDeleteResources(selectedCourseId)
                    setRemoveModalState(false);
                }}
                title='Delete File Confirmation'
                description='This action cannot be undone'
            />}
        </>
    )
}

export default FileTabPage