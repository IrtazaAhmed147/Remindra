import React, { useEffect } from "react";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourseAction } from "../../redux/actions/courseActions";

const tabPaths = ["overview", "assignments", "quizzes", "resources", "pdfs"];

const SingleCourseLayout = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { singleCourse, courseIsLoading } = useSelector((state) => state.course);

  const currentTab = tabPaths.findIndex(path => location.pathname.includes(path));
  const [tab, setTab] = React.useState(currentTab === -1 ? 0 : currentTab);

  useEffect(() => {
    dispatch(getSingleCourseAction(courseId));
  }, [courseId, dispatch]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    console.log(newValue);
    console.log(tabPaths);
    if (tabPaths[newValue] === 'overview') {

      navigate('');
    } else {

      navigate(tabPaths[newValue]);
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

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" sx={{ fontSize: '10px' }} />
        <Tab label="Assignments" sx={{ fontSize: '10px' }} />
        <Tab label="Quizzes" sx={{ fontSize: '10px' }} />
        <Tab label="Resources" sx={{ fontSize: '10px' }} />
        <Tab label="PDFs" sx={{ fontSize: '10px' }} />
      </Tabs>

      <Outlet />
    </Box>
  );
};

export default SingleCourseLayout;
