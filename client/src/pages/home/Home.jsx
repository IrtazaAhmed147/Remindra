// import React from "react";
import Box from "@mui/material/Box";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Divider } from "@mui/material";
import CourseCard from "../../components/cards/CourseCard";


function Home() {
  const overviewCards = [
    {
      title: "Courses",
      icon: <FolderCopyOutlinedIcon sx={{ color: "var(--primary-color)", fontSize: 35 }} />,
      stats: [
        { label: "Total Courses", value: 20 },
        { label: "Last Course", value: "HTML Basics" },
      ],
    },
    
    {
      title: "Friends",
      icon: <GroupOutlinedIcon sx={{ color: "var(--primary-color)", fontSize: 35 }} />,
      stats: [
        { label: "Total Friends", value: 20 },
        { label: "Pending Request", value: 5 },
      ],
    },
    {
      title: "Quiz",
      icon: <AssignmentOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 35 }} />,
      stats: [
        { label: "Completed", value: 20 },
        { label: "Pending", value: 14 },
        { label: "Next Due", value: "3-12-2025" },
      ],
    },
    {
      title: "Assignments",
      icon: <AssignmentOutlinedIcon sx={{ color: "var(--notification-color)", fontSize: 35 }} />,
      stats: [
        { label: "Completed", value: 20 },
        { label: "Pending", value: 5 },
        { label: "Next Due", value: "Tomorrow, 5pm" },
      ],
    },
  ];

  return (
    <>
      {/* <Box sx={{ display: "flex" }}> */}
      

        <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)", padding: "20px", }}>
          {/* Heading */}
          <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
            Dashboard
          </Typography>

          {/* Overview Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {overviewCards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "23%" },
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "15px",
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
                  <Typography variant="h6" fontWeight="bold" color="var(--text-color)">
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

          <Divider sx={{margin:"20px 0px"}}/>

              <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
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
      {/* </Box> */}
    </>
  );
}

export default Home;
