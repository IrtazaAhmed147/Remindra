import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import CourseCard from '../../components/cards/CourseCard'
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
function CoursePage() {
    return (
        <>

            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" ,flexWrap:'wrap'}}>

                    <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                        Courses
                    </Typography>

                    <Box
                        onClick={() => navigate('/create/quiz')}
                        sx={{
                            width: { xs: "100%", sm: "48%", md: "250px" },
                            p: "10px 12px",
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
                            display: "flex",
                            mb:1,
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
                          <FolderCopyOutlinedIcon sx={{ fontSize: 18, color: "#2A7DE1" }} />
                        </Box>

                        <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                           Create Course
                        </Typography>
                    </Box>
                </Box>


                <Box sx={{ display: "flex", width: "100%", gap: 1, justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>

                    <Box sx={{ display: "flex", width: { xs: "100%", sm: "40%", md: "40%" }, }}>

                        <input type="text" placeholder='Search your course' style={{
                            outline: "none",
                            background: "#fff",
                            border: "2px solid #2A7DE1",
                            borderRadius: "5px 0px 0px 5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }} />
                        <button style={{ height: "34px", padding: "5px 10px", color: "#fff", background: "var(--primary-color)", borderRadius: "0px 5px 5px 0px", border: "none", }}> <SearchIcon /> </button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>

                        <Select sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue={"Sort by Latest"}>
                            <MenuItem value="Sort by Latest">All Courses</MenuItem>
                            <MenuItem value="Sort by Ascending">My Courses</MenuItem>
                            <MenuItem value="Sort by Descending">Shared Courses</MenuItem>
                        </Select>
                        <Select sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue={"Sort by Latest"}>
                            <MenuItem value="Sort by Latest">Sort by Latest</MenuItem>
                            <MenuItem value="Sort by Ascending">Sort by Ascending</MenuItem>
                            <MenuItem value="Sort by Descending">Sort by Descending</MenuItem>
                        </Select>
                    </Box>


                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '10px', marginTop: "20px" }}>

                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />

                </Box>


            </Box>
        </>
    )
}

export default CoursePage