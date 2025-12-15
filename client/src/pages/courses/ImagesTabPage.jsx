import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCourseResourcesAction } from '../../redux/actions/resourceActions';
import { useParams } from 'react-router-dom';
import { handleDownloadAll } from '../../redux/actions/courseActions';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import RemoveModal from '../../components/modal/RemoveModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GradientBtn from "../../components/common/GradientBtn";
import "react-photo-view/dist/react-photo-view.css";

function ImagesTabPage() {

    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const {resources, isLoading: resourcesLoading} = useSelector((state)=> state.resource)
    const {courseId} = useParams()
    useEffect(()=> {
        dispatch(getCourseResourcesAction(courseId)).then((msg)=> console.log(msg))
    },[])
    const handleDeleteResources = () => {
        dispatch(deleteAllResourceAction(courseId))
          .then((msg) => {
            dispatch(getCourseResourcesAction(courseId));
            notify("success", msg);
          })
          .catch((err) => notify("error", err));
      };

    return (

        <>
        <Box>
            <Box sx={{ position: "sticky", top: 0, backgroundColor: "var(--bg-color)", display: "flex", mb: 2, justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
                <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                    Images
                </Typography>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {resources?.length > 0 && (
                        <>
                            <Button sx={{ minWidth: "auto", bgcolor: "red", borderRadius: "50%", color: "#fff" }} onClick={() => setIsModal(true)}>
                                <DeleteIcon />
                            </Button>
                            <Button disabled={downloadLoading} onClick={async () => {
                                setDownloadLoading(true);
                                try {
                                    await handleDownloadAll(courseId);
                                } catch (err) {
                                    console.error(err);
                                }
                                setDownloadLoading(false);
                            }} sx={{ minWidth: "auto", bgcolor: "var(--primary-color)", borderRadius: "50%", color: "#fff" }}>
                                <ArrowDownwardIcon />
                            </Button>
                        </>
                    )}
                    <GradientBtn icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />} text="Add Images" url={`/add/resources/${courseId}`} />
                </Box>
            </Box>

            {resourcesLoading ? (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "250px" }}>
                    <CircularProgress color="inherit" size="30px" />
                </Box>
            ) : (
                <PhotoProvider>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {resources?.map((resource, index) => (
                            <PhotoView src={resource.fileUrl} key={index}>
                                <Box
                                    component="img"
                                    src={resource.fileUrl}
                                    sx={{
                                        width: { xs: "30%", sm: "23%", md: "23%" },
                                        maxHeight: 200,
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        transition: "0.2s",
                                        "&:hover": { transform: "scale(1.03)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                                    }}
                                />
                            </PhotoView>
                        ))}
                    </Box>
                </PhotoProvider>
            )}
        </Box>

         {isModal && (
        <RemoveModal
          open={isModal}
          onClose={() => setIsModal(false)}
          title={"All Photos Delete"}
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