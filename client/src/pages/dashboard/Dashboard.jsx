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
            gap: "25px",
            mb: 3,
          }}
        >
          {/* Quick Action Card Component */}
          {[
            {
              title: "Create Course",
              icon: <FolderCopyOutlinedIcon sx={{ fontSize: 20, color: "#fff" }} />,
              gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
              url: "/add/course"
            },
            {
              title: "Add Assignment",
              icon: <AssignmentOutlinedIcon sx={{ fontSize: 20, color: "#fff" }} />,
              gradient: "linear-gradient(135deg, #ff9966, #ff5e62)",
              url: "/create/assignment"
            },
            {
              title: "Add Quiz",
              icon: <AssignmentOutlinedIcon sx={{ fontSize: 20, color: "#fff" }} />,
              gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
              url: "/create/quiz"
            },
          ].map((action, index) => (
            <Box
              onClick={() => navigate(action.url)}
              key={index}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                padding: "10px 15px",
                fontSize: "16px",
                borderRadius: "10px",
                color: "#fff",
                background: action.gradient,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "0.4s",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  transform: "scale(1.01) translateY(-5px)",
                  boxShadow: "0px 15px 40px rgba(0,0,0,0.3)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: "12px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                {action.icon}
              </Box>

              {/* Title */}
              <Typography fontWeight="bold">
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
