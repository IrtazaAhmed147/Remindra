import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/cards/CourseCard'
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disableCourseAction, getUserCoursesAction } from '../../redux/actions/courseActions';
import { notify } from '../../utils/HelperFunctions';
import RemoveModal from '../../components/modal/RemoveModal';
import ShareCourseModal from '../../components/modal/ShareCourseModal';
import { getAllUsersAction, suspendUserAction } from '../../redux/actions/userActions';
import { sendInviteAction } from '../../redux/actions/inviteActions';
import GradientBtn from '../../components/common/GradientBtn';


function CoursePage() {
    const { courseIsLoading, courses, error } = useSelector((state) => state.course)
    const { users, userIsLoading } = useSelector((state) => state.user)
    const [searchName, setSearchName] = useState("");
    const [courseType, setCourseType] = useState("all");
    const [removeModalState, setRemoveModalState] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseMembers, setCourseMembers] = useState([]);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        const name = searchParams.get("courseName") || "";
        const type = searchParams.get("courseType") || "all";

        setSearchName(name);
        setCourseType(type);

        dispatch(getUserCoursesAction({ courseName: name, courseType: type })).catch((msg) => notify("error", msg))

    }, []);

    const deleteCourse = (id) => {

        dispatch(disableCourseAction(id))
            .then((msg) => {
                notify('success', msg);
                dispatch(getUserCoursesAction({
                    courseName: searchName,
                    courseType: courseType
                })).catch((msg) => notify("error", msg))
            })
            .catch((err) => {

                notify('error', err)

                dispatch(getUserCoursesAction({
                    courseName: searchName,
                    courseType: courseType
                })).catch((msg) => notify("error", msg))
            });


    }

    const handleSearch = (type, searchName) => {

        const params = {};
        if (searchName?.trim()) params.courseName = searchName;

        params.courseType = type || 'all';


        setSearchParams(params);

        // API call
        dispatch(getUserCoursesAction(params)).catch((msg) => notify("error", msg))
    };
    const handleShare = (userIds) => {
        dispatch(sendInviteAction(userIds[0], selectedCourseId)).then((msg) => notify('success', msg)).catch((msg) => notify("error", msg))
    };

    return (
        <>

            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>

                <Box sx={{ width: "100%", display: "flex", mb: 2, justifyContent: "space-between", flexWrap: 'wrap' }}>

                    <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                        Courses
                    </Typography>

                    <GradientBtn text={"Create Course"} icon={<FolderCopyOutlinedIcon sx={{ fontSize: 18, color: "#2A7DE1" }} />} url={'/add/course'} />
                </Box>


                <Box sx={{ display: "flex", width: "100%", gap: 1, justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>

                    <Box sx={{ display: "flex", width: { xs: "100%", sm: "40%", md: "40%" }, }}>


                        <input type="search" placeholder='Search your course' value={searchName} onChange={(e) => setSearchName(e.target.value)} style={{
                            outline: "none",
                            background: "#fff",
                            border: "2px solid #2A7DE1",
                            borderRadius: "5px 0px 0px 5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }} />
                        <button onClick={() => handleSearch(courseType, searchName)} style={{ height: "34px", padding: "5px 10px", color: "#fff", background: "var(--primary-color)", borderRadius: "0px 5px 5px 0px", border: "none", }}> <SearchIcon /> </button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>

                        <Select value={courseType} onChange={(e) => {
                            setCourseType(e.target.value)
                            handleSearch(e.target.value, searchName)
                        }
                        } sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue='all'>
                            <MenuItem value="all">All Courses</MenuItem>
                            <MenuItem value="mycourses">My Courses</MenuItem>
                            <MenuItem value="sharedcourses">Shared Courses</MenuItem>
                        </Select>
                        {/* <Select sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue={"Sort by Latest"}>
                            <MenuItem value="Sort by Latest">Sort by Latest</MenuItem>
                            <MenuItem value="Sort by Ascending">Sort by Ascending</MenuItem>
                            <MenuItem value="Sort by Descending">Sort by Descending</MenuItem>
                        </Select> */}
                    </Box>


                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '10px', marginTop: "20px" }}>
                    {error && (<Typography fontSize={"14px"} margin={'auto'} mt={2}>{error}</Typography>)}
                    {courseIsLoading && !error && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", width: "100%" }} >
                        <CircularProgress sx={{ color: "var(--text-color)" }} size="30px" />
                    </Box>}
                    {!courseIsLoading && !error && (
                        courses?.length === 0 ?
                            (<Typography fontSize={"14px"} margin={'auto'} mt={2}>You haven't created any courses yet. Start by creating your first course to get started!</Typography>)
                            : (courses?.map((course) => (

                                <CourseCard key={course._id} {...course} setShareModalOpen={
                                    (id, members) => {
                                        // dispatch(getAllUsersAction({ isSuspend: true, isDeactivate: true, members: JSON.stringify(course?.members), limit: 5 })).then(() => {

                                        // })
                                        setCourseMembers(course?.members)
                                        setSelectedCourseId(id)
                                        setShareModalOpen(true)
                                    }
                                }
                                    askDelete={(id) => {
                                        setSelectedCourseId(id);
                                        setRemoveModalState(true);
                                    }} />
                            ))
                            )
                    )}


                    {/* <SuccessModal msg={"course deleted successfully"} /> */}
                    {removeModalState && <RemoveModal
                        open={removeModalState}
                        onClose={() => setRemoveModalState(false)}
                        onConfirm={() => {
                            deleteCourse(selectedCourseId);
                            setRemoveModalState(false);
                        }}
                        title='Delete Course Confirmation'
                        description='By deleting this course, all associated materials including assignments, quizzes, and other related content will also be permanently removed. This action cannot be undone'
                    />}
                    {<ShareCourseModal
                        searchUser={(username, members) => {
                            dispatch(getAllUsersAction({ username: username, isSuspend: true, isDeactivate: true, members: JSON.stringify(members), limit: 8 })).then(() => {
                                setCourseMembers(members)

                            }).catch((msg) => notify("error",msg))

                        }}
                        loading={userIsLoading}
                        members={courseMembers}
                        userList={users}
                        open={shareModalOpen}
                        onClose={() => setShareModalOpen(false)}
                        onShare={handleShare}
                    />}
                </Box>

            </Box>
        </>
    )
}

export default CoursePage