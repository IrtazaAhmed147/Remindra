import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourseAction } from "../../redux/actions/courseActions";


const ownerTabs = ["overview", "assignments", "quizzes", "resources", "pdfs"];
const sharedTabs = ["resources", "pdfs"];



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


  const activeTabs = isOwner ? ownerTabs : sharedTabs;
  const currentTab = activeTabs.findIndex(tab =>
  location.pathname.includes(tab)
);

const tabValue = currentTab === -1 ? 0 : currentTab;

  useEffect(() => {
    if(JSON.stringify(singleCourse) === '{}'){
      dispatch(getSingleCourseAction(courseId))
    }

  }, [courseId]);

useEffect(() => {
  if (!courseReady) return;
  const basePath = `/course/${courseId}`;
  if (!isOwner && location.pathname === basePath) {
    navigate("resources", { replace: true });
  }
}, [courseReady, isOwner, location.pathname]);


  const handleTabChange = (e, newValue) => {

    const path = activeTabs[newValue];
    if (path === "overview") {
      navigate("");
    } else {
      navigate(path);
    }
  };


  if (courseIsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress color="inherit" size="30px" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Typography fontSize="20px" fontWeight={700} sx={{ mb: 1 }}>
        {singleCourse?.title || "Course Title"}
      </Typography>
      <Typography fontSize="13px" sx={{ mb: 3, color: "#64748b" }}>
        {singleCourse?.description || ""}
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>

        {activeTabs?.map((item, i) => (
          <Tab label={item} key={i} sx={{ fontSize: '10px' }} />
        ))}
      </Tabs>

      <Outlet />
    </Box>
  );
};

export default SingleCourseLayout;
