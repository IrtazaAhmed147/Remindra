import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { CircularProgress, Divider } from "@mui/material";
import CourseCard from "../../components/cards/CourseCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions/dashboardActions";
import DashStatCard from "../../components/cards/DashStatCard";
import GradientBtn from "../../components/common/GradientBtn";
import { getUserCoursesAction } from "../../redux/actions/courseActions";

import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { notify } from "../../utils/HelperFunctions";
function Dashboard() {


  const dispatch = useDispatch();
  const { stats, statsLoading,
    statsError } = useSelector((state) => state.dashboard)
  const { courses, courseIsLoading } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(getStats()).then((msg)=> console.log(msg)).catch((msg) => notify("error",msg))
    dispatch(getUserCoursesAction({ courseType: 'all', limit: 3 })).catch((msg) => notify("error",msg))


  }, [])

  return (
    <>


      <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", minHeight: "100vh" }}>

        <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
          Dashboard
        </Typography>

        {/* Overview Cards */}
        {statsLoading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}> <CircularProgress  sx={{color:"var(--text-color)"}} size={'30px'} /> </Box> :
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: "10px", sm: "10px", md: "20px" },

            }}
          >
            <DashStatCard title="Courses"
              icon={<FolderCopyOutlinedIcon sx={{ color: "#2A7DE1", fontSize: 20 }} />}
              stats={[
                { label: "Total Courses", value: stats?.totalCourses },
                { label: "Courses in which you are member", value: stats.sharedCourses },
              ]}
            />
            <DashStatCard title="Quizs"
              icon={<QuizOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 20 }} />}
              stats={[
                { label: "Total Quizs", value: stats?.totalQuizzes },
                { label: "Pending", value: stats?.pendingQuizzes },
                { label: "Completed", value: stats?.completedQuizzes },
              ]}
            />
            <DashStatCard title="Assignments"
              icon={<AssignmentOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 20 }} />}
              stats={[
                { label: "Total Assignments", value: stats?.totalAssignments },
                { label: "Pending", value: stats?.pendingAssignments },
                { label: "Completed", value: stats?.completedAssignments },
              ]}
            />
          </Box>
        }
        <Divider sx={{ margin: "20px 0px" }} />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            mb: 3,
          }}
        >
          {[
            {
              title: "Create Course",
              icon: <FolderCopyOutlinedIcon sx={{ fontSize: 18, color: "#2A7DE1" }} />,
              url: "/add/course",
            },
            {
              title: "Add Assignment",
              icon: <AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />,
              url: "/create/assignment",
            },
            {
              title: "Add Quiz",
              icon: <QuizOutlinedIcon sx={{ fontSize: 18, color: "#1C5FB8" }} />,
              url: "/create/quiz",
            },
          ].map((action, index) => (

            <GradientBtn key={index} text={action?.title} icon={action?.icon} url={action?.url} />
          ))}

        </Box>



        <Typography variant="h4" fontWeight="bold" mt={2} color="var(--text-color)" sx={{ mb: 2 }}>
          Quick Access
        </Typography>
        {
          courseIsLoading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}> <CircularProgress  sx={{color:"var(--text-color)"}} size={'30px'} /> </Box> :
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {courses?.map((course) => (
                <CourseCard key={course._id} {...course} isShow={false} />
              ))
              }
            </Box>
        }


      </Box>
    </>
  );
}

export default Dashboard;
