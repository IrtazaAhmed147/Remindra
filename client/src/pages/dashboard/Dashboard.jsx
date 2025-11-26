import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Divider } from "@mui/material";
import CourseCard from "../../components/cards/CourseCard";
import TaskTable from "../../components/tables/TaskTable";
import { useNavigate } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate()

  const overviewCards = [
    {
      title: "Courses",
      icon: <FolderCopyOutlinedIcon sx={{ color: "#2A7DE1", fontSize: 20 }} />,
      stats: [
        { label: "Total Courses", value: 20 },
        { label: "Last Course", value: "HTML Basics" },
      ],
    },

    {
      title: "Friends",
      icon: <GroupOutlinedIcon sx={{ color: "#2A7DE1", fontSize: 20 }} />,
      stats: [
        { label: "Total Friends", value: 20 },
        { label: "Pending Request", value: 5 },
      ],
    },
    {
      title: "Quiz",
      icon: <AssignmentOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 20 }} />,
      stats: [
        { label: "Completed", value: 20 },
        { label: "Pending", value: 14 },
        { label: "Next Due", value: "3-12-2025" },
      ],
    },
    {
      title: "Assignments",
      icon: <AssignmentOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 20 }} />,
      stats: [
        { label: "Completed", value: 20 },
        { label: "Pending", value: 5 },
        { label: "Next Due", value: "Tomorrow, 5pm" },
      ],
    },
  ];

  return (
    <>


      <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>

        <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
          Dashboard
        </Typography>

        {/* Overview Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: "10px", sm: "10px", md: "20px" },
          }}
        >
          {overviewCards.map((card, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "45%", sm: "48%", md: "23%" },
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: { xs: "10px", sm: "15px", md: "15px" },
                boxShadow: "0px 4px 15px rgba(0,0,0,0.12)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.18)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              {/* Title + Icon */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                {card.icon}
                <Typography sx={{ fontSize: { xs: "16px", sm: "20px", md: "25px" } }} fontWeight="bold" color="var(--text-color)">
                  {card.title}
                </Typography>
              </Box>

              {/* Stats */}
              {card.stats.map((stat, i) => (
                <Typography key={i} fontSize="13px" color="var(--text-color)">
                  {stat.label}: <b>{stat.value}</b>
                </Typography>
              ))}
            </Box>
          ))}
        </Box>

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
              gradient: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
              url: "/add/course",
            },
            {
              title: "Add Assignment",
              icon: <AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />,
              gradient: "linear-gradient(135deg, #EEF0FF, #F8F9FF)",
              url: "/create/assignment",
            },
            {
              title: "Add Quiz",
              icon: <AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#1C5FB8" }} />,
              gradient: "linear-gradient(135deg, #E9F1FF, #F4F7FF)",
              url: "/create/quiz",
            },
          ].map((action, index) => (
            <Box
              key={index}
              onClick={() => navigate(action.url)}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                p: "10px 12px",
                borderRadius: "14px",
                background: action.gradient,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "0.25s ease",
                border: "1px solid rgba(0,0,0,0.05)",

                "&:hover": {
                  background: "linear-gradient(135deg, #ffffff, #f2f8ff)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* Icon Bubble */}
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  backgroundColor: "rgba(42, 125, 225, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {action.icon}
              </Box>

              {/* Title */}
              <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                {action.title}
              </Typography>
            </Box>
          ))}
        </Box>


        <Typography mt={2} variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
          Tasks
        </Typography>

        <TaskTable />

        <Typography variant="h4" fontWeight="bold" mt={2} color="var(--text-color)" sx={{ mb: 2 }}>
          Courses
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >

          <CourseCard />
          <CourseCard />
          <CourseCard />

        </Box>


      </Box>
    </>
  );
}

export default Dashboard;
