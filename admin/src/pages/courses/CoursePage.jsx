// CourseManagement.jsx
import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Divider,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAction } from "../../redux/actions/courseActions";
import CourseTable from "../../components/tables/coursesTable.jsx";

const CoursePage = () => {
    const form = useRef({});

    const dispatch = useDispatch();
    const { courses, courseIsLoading } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(getAllCoursesAction());
    }, []);

    const handleSubmit = () => {
        dispatch(getAllCoursesAction({ ...form.current }));
    };

    return (
        <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Course Management
            </Typography>

            {/* ---------- Top Stats ---------- */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                {[
                    { label: "Total Courses", value: courses?.length },
                ].map((item) => (
                    <Card
                        key={item.label}
                        sx={{ flex: "1 1 150px", minWidth: 120, boxShadow: 3 }}
                    >
                        <CardContent sx={{ p: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#6b7280" }}>
                                {item.label}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 0.5, fontSize: 20 }}>
                                {item.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* ---------- Filters ---------- */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 3,
                }}
            >
                {/* Search by Title */}
                <Box sx={{ width: { xs: "100%", sm: "25%" } }}>
                    <input
                        type="text"
                        placeholder='Search course title'
                        name="courseName"
                        onChange={(e) =>
                            form.current = { ...form.current, [e.target.name]: e.target.value }
                        }
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #2A7DE1",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }}
                    />
                </Box>

                {/* Search by Instructor Email */}
                <Box sx={{ width: { xs: "100%", sm: "25%" } }}>
                    <input
                        type="text"
                        placeholder='Owner Username'
                        name="username"
                        onChange={(e) =>
                            form.current = { ...form.current, [e.target.name]: e.target.value }
                        }
                        style={{
                            outline: "none",
                            background: "#fff",
                            border: "1px solid #2A7DE1",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }}
                    />
                </Box>

                <Button variant="contained" onClick={handleSubmit}>
                    Search
                </Button>

                {/* Status Filter */}
                <Select
                    defaultValue="Status"
                    sx={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        height: 40,
                        minWidth: 120,
                    }}
                    onChange={(e) =>
                        form.current = { ...form.current, status: e.target.value }
                    }
                >
                    <MenuItem value="Status">Status</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                </Select>

                {/* Order By */}
                <Select
                    defaultValue="OrderBy"
                    sx={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        height: 40,
                        minWidth: 120,
                    }}
                    onChange={(e) =>
                        form.current = { ...form.current, order: e.target.value }
                    }
                >
                    <MenuItem value="OrderBy">Order By</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                </Select>

                {/* Date Filter */}
                <TextField
                    type="date"
                    size="small"
                    onChange={(e) =>
                        form.current = { ...form.current, date: e.target.value }
                    }
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 1,
                        minWidth: 150,
                    }}
                />
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* ---------- Course Table ---------- */}
            <Typography variant="h6" sx={{ mb: 1 }}>
                All Courses
            </Typography>

            {!courseIsLoading && (
                <CourseTable courses={courses} />
            )}
        </Box>
    );
};

export default CoursePage;
