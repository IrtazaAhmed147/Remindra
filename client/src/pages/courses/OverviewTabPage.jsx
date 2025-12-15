import StatCard from '../../components/singleCourseComponents/StatCard';
import { Box, CircularProgress } from '@mui/material';
import {  useSelector } from 'react-redux';

function OverviewTabPage() {
    const { singleCourse, courseIsLoading } = useSelector((state) => state.course);
    return (
        <>
            {courseIsLoading ? <CircularProgress color="inherit" size="30px" /> : <Box sx={{ display: "flex", gap: { xs: 1, sm: 1, md: 2 }, flexWrap: "wrap", mb: 4 }}>
                <StatCard label="Assignments" value={singleCourse?.assignments?.length || 0} />
                <StatCard label="Quizzes" value={singleCourse?.quizzes?.length || 0} />
                <StatCard label="Materials" value={singleCourse?.resources?.length || 0} />
            </Box>}
        </>
    )
}

export default OverviewTabPage
