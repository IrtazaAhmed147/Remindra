import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    MenuItem,
    Button,
    Paper,
    IconButton,
    Select
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCourseAction, getUserCoursesAction } from "../../redux/actions/courseActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notify } from "../../utils/HelperFunctions";
import { createAssignmentAction, getSingleAssignmentAction, updateAssignmentAction } from "../../redux/actions/assignmentActions";
import dayjs from "dayjs";
import FullPageLoader from "../../components/loader/FullPageLoader";

export default function AddAssignmentPage() {
    const [coverFiles, setCoverFiles] = useState([]);
    const [coverPreviews, setCoverPreviews] = useState([]);
    const { assignmentLoading } = useSelector((state) => state.assignments)
    const { courseIsLoading } = useSelector((state) => state.course)


    const [dueDate, setDueDate] = useState(null); // local state for picker
    const form = useRef({ task: "" })
    const [courseList, setCourseList] = useState([]);
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const navigate = useNavigate();

    useEffect(() => {

        if (params.get("type") === 'edit' && params.get("id")) {
            dispatch(getSingleAssignmentAction(params.get("id"))).then((data) => {
                form.current = {
                    title: data.title,
                    task: data.description,
                    dueDate: data.dueDate,
                    course: data.courseId.title

                }
                setDueDate(data.dueDate ? dayjs(data.dueDate) : null);
                setCoverPreviews(
                    data.attachments.map(att => ({
                        url: att.url,
                        isOld: true
                    }))
                );

            }).catch((msg) => notify("error",msg))
        }
    }, [])


    const handleCreateAssigment = async () => {

        if(coverFiles.length > 5) {
            return notify("error", "files maximum length is 5");
        }
        if ((!form.current.title || !form.current.task || !form.current.dueDate ) || (!form.current.title.trim() || !form.current.task.trim())) {


            notify("error", "Please fill in all required fields: Title, Task, Course, and Due Date. Uploading a file is optional.");
            return

        }
        const formData = new FormData();
        formData.append("title", form.current.title);
        formData.append("description", form.current.task);
        formData.append("dueDate", form.current.dueDate);
        formData.append("status", "Pending");
        coverFiles.forEach((file, index) => {
            formData.append("attachments", file);
        });


        if (params.get('type') === 'edit' && params.get('id')) {

            dispatch(updateAssignmentAction(params.get('id'), formData)).then((msg) => {
                
                notify("success", msg)
                navigate("/assignment")
            }).catch((msg) => notify("error", msg))
        } else {
            dispatch(createAssignmentAction( formData)).then((msg) => {
                
                notify("success", msg)
                navigate("/assignment")
            }).catch((msg) => notify("error", msg))

        }

    }


    const handleCoverUpload = (e) => {
        const files = Array.from(e.target.files);

        const previews = files.map(file => ({
            url: URL.createObjectURL(file),
            isOld: false
        }));

        setCoverFiles(prev => [...prev, ...files]);
        setCoverPreviews(prev => [...prev, ...previews]);

    };

    const removeImage = (index) => {

        const removed = coverPreviews[index];
        setCoverPreviews(prev => prev.filter((_, i) => i !== index));
        if (!removed.isOld) {
            setCoverFiles(prev => prev.slice(0, prev.length - 1));
        }
    };

    return (
        <Box sx={{ p: 2, width: "100%", mx: "auto", minHeight: "100vh" }}>
             {assignmentLoading && <FullPageLoader />}
            {/* Heading */}
            <Typography
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text-color)"
                }}
            >
                Create Assignment
            </Typography>
            {(params.get('type') === 'edit') && <Typography sx={{ mt: 2, mb: 1, fontSize: "15px", color: "#6b7280" }}>
                Course:   <Box
                    component="span"
                    sx={{ color: "var(--text-color)", fontWeight: 500, ml: 0.5 }}
                >
                    {form?.current?.course}
                </Box>
            </Typography>}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    gap: 4,
                }}
            >

                <Box sx={{ width: { xs: "100%", sm: "48%", md: "48%" } }}>

                    {/* Assignment Name */}
                    <Typography sx={{ mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Assignment Title
                    </Typography>
                    <input
                        type="text"
                        name="title"
                        defaultValue={form.current.title}
                        onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }}
                        placeholder="Enter title"
                        style={{
                            color:"var(--text-color)",
                            outline: "none",
                            background: "var(--input-bg-color)",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            width: "100%",
                            height: "34px",
                            fontSize: "13px"
                        }}
                    />

                    {/* {(params.get('type') !== 'edit') && <><Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Select Course
                    </Typography>
                        <Select
                            fullWidth
                            size="small"
                            disabled={courseIsLoading}
                            name="course"
                            sx={{
                                mb: 2,
                                background: "var(--input-bg-color)",
                                fontSize: "13px",
                                borderRadius: "6px",
                                height: "40px",
                                color: "var(--text-color)",
                            }}
                            onChange={(e) => {
                                // setCourseType(e.target.value)
                                form.current = { ...form.current, [e.target.name]: e.target.value }

                            }}
                            defaultValue={"Select Course"}
                        >
                            <MenuItem value={'Select Course'} sx={{ fontSize: "13px" }}>
                                Select Course
                            </MenuItem>
                            {courseList?.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id} sx={{ fontSize: "13px" }}>
                                    {cat.title}
                                </MenuItem>
                            ))}
                        </Select> </>} */}

                    {/* Task Input */}
                    <Typography sx={{ mt: 1, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Task
                    </Typography>
                    <textarea
                    
                        defaultValue={form.current.task}
                        name="task"
                        onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }}
                        rows={6}
                        placeholder="Write assignment task..."
                        style={{
                            color:"var(--text-color)",
                            outline: "none",
                            background: "var(--input-bg-color)",
                            border: "1px solid #cfd3d8",
                            borderRadius: "6px",
                            padding: "8px 10px",
                            width: "100%",
                            fontSize: "13px",
                        }}
                    ></textarea>

                    <Typography sx={{ mt: 1, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Due Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            // label="Due Date"
                            value={dueDate}
                            onChange={(newValue) => {
                                setDueDate(newValue); // update local state
                                form.current.dueDate = newValue ? newValue.format("YYYY-MM-DD") : "";
                                // store as string in your form data
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: "small",
                                    sx: {

                                        "& .MuiSvgIcon-root": {
                                            color: "var(--text-color)",
                                        },
                                        "& .MuiPickersInputBase-root": {
                                            border: "1px solid var(--text-color)",
                                            color: "var(--text-color)",
                                            fontSize: { xs: 12, sm: 15, md: 15 },
                                        },

                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>

                {/* RIGHT SIDE — MULTIPLE IMAGES */}
                <Box sx={{ width: { xs: "100%", sm: "48%", md: "48%" } }}>
                    <Typography sx={{ mb: 1 }}>Upload Files</Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            border: "2px dashed #bfc6d1",
                            minHeight: "250px",
                            borderRadius: "10px",
                            padding: 1,
                            cursor: "pointer",
                            background: "var(--input-bg-color)",
                        }}
                        onClick={() => document.getElementById("coverUpload").click()}
                    >
                        {coverPreviews.length === 0 ? (
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#6b7280"
                                }}
                            >
                                <CloudUploadIcon sx={{ fontSize: 40 }} />
                                <Typography>Upload Images</Typography>
                                <Typography sx={{ fontSize: "12px" }}>
                                    (You can upload multiple images)
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {coverPreviews.map((img, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "48%",
                                            height: "140px",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Remove Button */}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                background: "#fff",
                                                borderRadius: "50%",
                                                boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>

                                        {/* Image */}
                                        <img
                                            src={img.url}
                                            alt="preview"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept="image/*,application/pdf,text/plain"
                        multiple
                        id="coverUpload"
                        style={{ display: "none" }}
                        onChange={handleCoverUpload}
                    />
                </Box>
            </Box>

            {/* BUTTONS */}
            <Box sx={{ mt: 4 }}>
                <Button
                    disabled={assignmentLoading}
                    onClick={() => handleCreateAssigment()}
                    sx={{
                        padding: " 5px 10px",
                        width: "160px",
                        height: "35px",
                        borderRadius: "5px",
                        background: "var(--primary-color)",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontSize: "13px",
                        ":hover": {
                            backgroundColor: "#1258ad",
                        }
                    }}
                >
                    Save Assignment
                </Button>
            </Box>
        </Box>
    );
}
