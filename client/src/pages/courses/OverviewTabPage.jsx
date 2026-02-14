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
            {courseIsLoading ? <CircularProgress sx={{ color: "var(--text-color)" }} size="30px" /> : <Box >
                {singleCourse?.description && <Typography fontWeight={'bold'} fontSize="18px" sx={{ color: "#64748b" }}>
                  Description
                </Typography>}
                <Typography fontSize="13px" sx={{ mb: 2, color: "#64748b" }}>
                   <span></span>  {singleCourse?.description || ""}
                </Typography>
                <Typography fontWeight={'bold'} fontSize={'18px'}  >
                    Members
                </Typography>
                <List>
                    {singleCourse?.members?.map((member) => (


                        <ListItem sx={{fontSize:"14px",pb:0}} key={member?._id}>
                            {member?.username}
                        </ListItem>
                    ))}
                </List>
            </Box>}
        </>
    )
}

export default OverviewTabPage
