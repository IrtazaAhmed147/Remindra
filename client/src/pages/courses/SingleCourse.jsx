import { Box, Typography, Tabs, Tab, Card, CardContent, Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { Dialog } from "@mui/material";
// import img1 from "/images/1.jpg"
// import img2 from "/images/2.jpg"
// import img3 from "/images/3.jpg"

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskTable from "../../components/tables/TaskTable";

function SingleCourse() {
  const [tab, setTab] = useState(0);
  const [openImage, setOpenImage] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);



  const images = [
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    // img1,
    // img2,
    // img3,

  ];

  const pdfs = [
    { name: "Lecture 1 - Introduction.pdf" },
    { name: "HTML Notes.pdf" },
  ];

  const assignments = [
    { title: "Assignment 1", due: "5 Dec", status: "Completed" },
    { title: "Assignment 2", due: "10 Dec", status: "Pending" },
  ];

  const quizzes = [
    { title: "Quiz 1", marks: 10, status: "Completed" },
    { title: "Quiz 2", marks: 15, status: "Pending" },
  ];

  const friends = [
    { name: "Ali", img: "/avatar1.png" },
    { name: "Sara", img: "/avatar2.png" },
    { name: "Hamza", img: "/avatar3.png" },
  ];

  return (

    <>

      <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: "20px" }}>

        {/* Header */}
        <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
          HTML Course
        </Typography>

        <Typography fontSize="14px" color="#475569" sx={{ mb: 2 }}>
          Learn the basics of HTML structure, tags, and web page layout.
        </Typography>

        <Typography fontSize="13px" color="var(--text-color)" sx={{ mb: 4 }}>
          Owner: <b>Irtaza Ahmed Khatri</b> &nbsp;|&nbsp; Total Materials: <b>23</b> &nbsp;|&nbsp; Shared With: <b>5</b>
        </Typography>

        {/* Stats Cards */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
          <StatCard label="Assignments" value={assignments.length} />
          <StatCard label="Quizzes" value={quizzes.length} />
          <StatCard label="Materials" value={images.length + pdfs.length} />
          <StatCard label="Shared Friends" value={friends.length} />
        </Box>

        {/* <TaskTable /> */}
     <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            mb: 2,
            minHeight: 40,
            "& .MuiTab-root": {
              minHeight: 40,
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "none",
              // padding: "6px 12px",
            },
            "& .Mui-selected": { color: "var(--primary-color)" },
            "& .MuiTabs-indicator": { backgroundColor: "var(--primary-color)", height: "3px" },
          }}
        >
          <Tab label={`Assignments`} />
          <Tab label={`Quizzes`} />
          <Tab label={`Images`} />
          <Tab label={`PDFs`} />
          <Tab label={`Members`} />
        </Tabs>

          {tab === 0 && <TaskTable />}
          {tab === 1 && <TaskTable />}

        {tab === 2 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenImage(true);
                }}
                style={{ cursor: "pointer" }}
                sx={{
                  width: "200px",
                  height: "140px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                }}
              />

            ))}
          </Box>
        )}

        {tab === 3 && (
          <Box>
            {pdfs.map((pdf, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  mb: 1,
                }}
              >
                📄 {pdf.name}
              </Box>
            ))}
          </Box>
        )}


      </Box>
     

      {/* Fullscreen Image Viewer */}
      <Dialog
        open={openImage}
        onClose={() => { }}   // ❌ Disable outside click close
        maxWidth="lg"
        PaperProps={{
          sx: { background: "transparent", boxShadow: "none", overflow: "hidden" ,position:"static"}
        }}
      >
        <Box
          sx={{
            // position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // background: "rgba(0,0,0,0.9)",
            // p: "40px",
            borderRadius: "10px"
          }}
        >
          {/* LEFT BUTTON */}
         {currentIndex > 0 && <Button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
            }
            sx={{
              position: "absolute",
              left: -2,
              color:"#fff",
              fontSize: "30px",
              minWidth: "40px",
            }}
          >
            <KeyboardArrowLeftIcon fontSize="large"/>
          </Button>}

          {/* IMAGE */}
          <img
            src={images[currentIndex]}
            style={{
              maxWidth: "80vw",
              maxHeight: "85vh",
              borderRadius: "10px"
            }}
          />

          {/* RIGHT BUTTON */}
        {currentIndex !== (images.length - 1) &&  <Button
            onClick={() =>
              setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
            }
            sx={{
              position: "absolute",
              right: 2,
              color: "white",
              fontSize: "30px",
              minWidth: "40px",
            }}
          >
            <ChevronRightIcon  fontSize="large"/>
          </Button>}

          {/* CLOSE BUTTON */}
          <Button
            onClick={() => setOpenImage(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "white",
              color: "black",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              minWidth: "35px",
              boxShadow: "0 4px 12px rgba(255,255,255,0.3)"
            }}
          >
            ✕
          </Button>
        </Box>
      </Dialog>




    </>
  );
}


function StatCard({ label, value }) {
  return (
    <Card
      sx={{
        width: { xs: "30%", md: "15%" },
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography fontSize="13px" color="#6b6b6b">{label}</Typography>
        <Typography variant="h5" fontWeight="bold" color="var(--text-color)">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default SingleCourse;
