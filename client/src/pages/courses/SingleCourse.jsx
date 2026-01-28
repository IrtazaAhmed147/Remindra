import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourseAction } from "../../redux/actions/courseActions";
import { notify } from "../../utils/HelperFunctions";


const ownerTabs = ["overview", "resources", "files"];
const sharedTabs = ["resources", "files"];

const tabs = ["resources", "files"];


const SingleCourseLayout = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const { singleCourse, courseIsLoading } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth)
  const courseReady =
    !courseIsLoading &&
    Boolean(singleCourse?._id) &&
    Boolean(user?._id);

  const isOwner = courseReady && singleCourse.owner._id === user._id;


  const activeTabs = tabs;
  const currentTab = activeTabs.findIndex(tab =>
    location.pathname.includes(tab)
  );

  const tabValue = currentTab === -1 ? 0 : currentTab;

  useEffect(() => {
    if (JSON.stringify(singleCourse) === '{}') {
      dispatch(getSingleCourseAction(courseId)).catch((msg) => notify("error",msg))
    }

  }, [courseId]);

  useEffect(() => {
    if (!courseReady) return;
    const basePath = `/course/${courseId}/resources`;
    if (location.pathname === `/course/${courseId}` || location.pathname === `/course/${courseId}/`) {
      navigate("resources", { replace: true });
    }
    // if (!isOwner && location.pathname === basePath) {
    //   navigate("resources", { replace: true });
    // }
  }, [courseReady, isOwner, location.pathname]);


  const handleTabChange = (e, newValue) => {

    const path = activeTabs[newValue];
    // if (path === "overview") {
    //   navigate("");
    // } else {
      navigate(path);
    // }
  };


  if (courseIsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress  sx={{color:"var(--text-color)"}} size="30px" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Typography fontSize="20px" color="var(--text-color)" fontWeight={700} sx={{ mb: 1 }}>
        {singleCourse?.title || "Course Title"}
      </Typography>
      <Typography fontSize="13px" sx={{ mb: 3, color: "#64748b" }}>
        {singleCourse?.description || ""}
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>

        {activeTabs?.map((item, i) => (
          <Tab label={item} key={i} sx={{ fontSize: '10px',color:"var(--text-color)" }} />
        ))}
      </Tabs>

      <Outlet />
    </Box>
  );
};

export default SingleCourseLayout;
