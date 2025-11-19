import { Box, Typography, Tabs, Tab, Card, CardContent, Avatar, Button } from "@mui/material";
import React from "react";
import TaskTable from "../../components/tables/TaskTable";

function SingleCourse() {
  const [tab, setTab] = React.useState(0);

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
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    
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

      <TaskTable />

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { fontWeight: "600" },
          "& .Mui-selected": { color: "var(--primary-color)" },
          "& .MuiTabs-indicator": { backgroundColor: "var(--primary-color)" },
        }}
      >
        <Tab label="Images" />
        <Tab label="PDFs" />
        <Tab label="All" />
      </Tabs>

      {/* Tab Content */}
      {tab === 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {images.map((img, index) => (
            <Box
              key={index}
              component={'img'}
              src={img}
              sx={{
                width: "200px",
                height: "140px",
                backgroundColor: "#fff",
                
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </Box>
      )}

      {tab === 1 && (
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

      {tab === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Images */}
          <Typography fontWeight="bold" color="var(--text-color)">Images</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  width: "200px",
                  height: "140px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </Box>

          {/* PDFs */}
          <Typography fontWeight="bold" color="var(--text-color)" sx={{ mt: 2 }}>
            PDFs
          </Typography>
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

      {/* Assignments */}
      {/* <SectionTitle title="Assignments" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {assignments.map((a, i) => (
          <ListCard key={i} title={a.title} subtitle={`Due: ${a.due}`} status={a.status} />
        ))}
      </Box> */}

      {/* Quizzes */}
      {/* <SectionTitle title="Quizzes" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {quizzes.map((q, i) => (
          <ListCard key={i} title={q.title} subtitle={`Marks: ${q.marks}`} status={q.status} />
        ))}
      </Box> */}

      {/* Friends */}
      {/* <SectionTitle title="Shared Friends" />
      <Box sx={{ display: "flex", gap: 2 }}>
        {friends.map((f, i) => (
          <Avatar key={i} src={f.img} sx={{ width: 50, height: 50 }} />
        ))}
      </Box> */}

    </Box>
  );
}

/* -----------------------------------------------------
Reusable Components
----------------------------------------------------- */

function StatCard({ label, value }) {
  return (
    <Card
      sx={{
        width: { xs: "48%", md: "23%" },
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

function SectionTitle({ title }) {
  return (
    <Typography variant="h6" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1, mt: 3 }}>
      {title}
    </Typography>
  );
}

function ListCard({ title, subtitle, status }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography fontWeight="bold" color="var(--text-color)">{title}</Typography>
      <Typography fontSize="13px" color="#555">{subtitle}</Typography>
      <Typography fontSize="13px" color={status === "Completed" ? "green" : "red"}>
        {status}
      </Typography>
    </Box>
  );
}

export default SingleCourse;
