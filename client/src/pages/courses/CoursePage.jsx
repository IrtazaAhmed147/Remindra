import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import CourseCard from '../../components/cards/CourseCard'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
function CoursePage() {
    return (
        <>

            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: "20px" }}>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                    <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                        Courses
                    </Typography>

                    <Link to={`/add/course`}>
                        <Button sx={{

                            padding: " 5px 10px",
                            width: "160px",
                            height: "35px",
                            border: "3px solid #1258ad",
                            borderRadius: "5px",
                            background: "var(--primary-color)",
                            color: "#fff",
                            transition: "0.3s all ease-in-out",
                            fontSize: "12px",
                            textTransform: "capitalize",
                            ":hover": {
                                backgroundColor: "#1258ad",
                            }
                        }}>
                            <AddIcon sx={{ height: "20px" }} />  Add Course
                        </Button>
                    </Link>
                </Box>


                <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>

                    <Box sx={{ display: "flex", width: "40%", }}>

                        <input type="text" placeholder='Search your course' style={{
                            outline: "none",
                            background: "#fff",
                            border: "2px solid var(--primary-color)",
                            borderRadius: "5px 0px 0px 5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }} />
                        <button style={{ height: "34px", padding: "5px 10px", color: "#fff", backgroundColor: "var(--primary-color)", borderRadius: "0px 5px 5px 0px", border: "none", }}> <SearchIcon /> </button>
                    </Box>
                    <Select sx={{ bgcolor: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue={"Sort by Latest"}>
                        <MenuItem value="Sort by Latest">Sort by Latest</MenuItem>
                        <MenuItem value="Sort by Ascending">Sort by Ascending</MenuItem>
                        <MenuItem value="Sort by Descending">Sort by Descending</MenuItem>
                    </Select>


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