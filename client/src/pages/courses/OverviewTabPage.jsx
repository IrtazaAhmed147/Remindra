import StatCard from '../../components/cards/StatCard';
import { Box, Button, CircularProgress, IconButton, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '../../components/common/CheckBox';
import { removeMembersCourse } from '../../redux/actions/courseActions';
import CustomizeLoader from '../../components/loader/CustomizeLoader';

function OverviewTabPage() {
    const { singleCourse, courseIsLoading, removeMembersLoading } = useSelector((state) => state.course);
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [selectedMembers, setSelectedMembers] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {

        if (singleCourse?.owner?._id && (singleCourse?.owner?._id !== user?._id)) {

            navigate('resources');
        }
    }, [singleCourse]);

    const removeMembers = async () => {
        // setIsEdit(true)
        console.log(selectedMembers);
        if (selectedMembers?.length > 0) {

            dispatch(removeMembersCourse(singleCourse?._id, selectedMembers))
        }


    }

    return (
        <>
            {courseIsLoading ? <CustomizeLoader /> : <Box >
                {singleCourse?.description && <Typography fontWeight={'bold'} fontSize="18px" sx={{ color: "#64748b" }}>
                    Description
                </Typography>}
                <Typography fontSize="13px" sx={{ mb: 2, color: "#64748b" }}>
                    <span></span>  {singleCourse?.description || ""}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography fontWeight="bold" fontSize="18px">
                        Members ({singleCourse?.members?.length || 0})
                    </Typography>

                    {singleCourse?.members?.length > 0 && (
                        <IconButton onClick={() => setIsEdit((prev) => !prev)}>
                            <EditDocumentIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>

                {/* No Members */}
                {singleCourse?.members?.length === 0 && (
                    <Typography pl={1} pt={1} fontSize="14px" color="text.secondary">
                        No members added yet
                    </Typography>
                )}

                {/* Members List */}
                {removeMembersLoading && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100px" }}>
                    <CustomizeLoader />
                </Box>}
                {!removeMembersLoading && singleCourse?.members?.length > 0 && (
                    <>
                        <List sx={{ mt: 1 }}>
                            {singleCourse?.members?.map((member) => (
                                <ListItem
                                    key={member?._id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1,
                                        "&:hover": { backgroundColor: "#f5f5f5" },
                                    }}
                                >
                                    <Typography fontSize="14px">
                                        {member?.username}
                                    </Typography>

                                    {isEdit && (
                                        <CheckBox
                                            checked={selectedMembers.includes(member?._id)}
                                            handleChange={() =>
                                                setSelectedMembers((prev) =>
                                                    prev.includes(member?._id)
                                                        ? prev.filter((id) => id !== member?._id)
                                                        : [...prev, member?._id]
                                                )
                                            }
                                            size="small"
                                        />
                                    )}
                                </ListItem>
                            ))}
                        </List>

                        {/* Remove Button */}
                        {isEdit && (
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    type="submit"
                                    onClick={removeMembers}
                                    disabled={selectedMembers.length === 0}
                                    sx={{

                                        px: 2,
                                        // width: "200px",
                                        height: "35px",
                                        borderRadius: "6px",
                                        border: "2px solid #aa0b0b",
                                        background: "#ce0606",
                                        color: "#fff !important",
                                        textTransform: "capitalize",
                                        fontSize: "13px",
                                        ":hover": { backgroundColor: "#c10707" },
                                    }}
                                >

                                    Remove {selectedMembers.length} Member
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>}
        </>
    )
}

export default OverviewTabPage
