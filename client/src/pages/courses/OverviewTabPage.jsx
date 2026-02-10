import StatCard from '../../components/cards/StatCard';
import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OverviewTabPage() {
    const { singleCourse, courseIsLoading } = useSelector((state) => state.course);
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        
        if (singleCourse?.owner?._id && (singleCourse?.owner?._id !== user?._id)) {

            navigate('resources');
        }
    }, [singleCourse]);

    return (
        <>
            {courseIsLoading ? <CircularProgress  sx={{color:"var(--text-color)"}} size="30px" /> : <Box >
                {/* <StatCard label="Assignments" value={singleCourse?.assignments?.length || 0} /> */}
                {/* <StatCard label="Quizzes" value={singleCourse?.quizzes?.length || 0} />
                <StatCard label="Materials" value={singleCourse?.resources?.length || 0} /> */}
                <Typography fontWeight={'bold'} fontSize={'20px'}  >
                    Members
                </Typography>
                <List>
                {singleCourse?.members?.map((member)=> (


                        <ListItem key={member?._id}>
                            {member?.username}
                        </ListItem>
                ))}
                </List>
            </Box>}
        </>
    )
}

export default OverviewTabPage
