import React, { useEffect } from 'react'
import UpdateProfileForm from '../../components/forms/UpdateProfileForm'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction, updateUserAction } from '../../redux/actions/userActions'
import { notify } from '../../utils/HelperFunctions'

function UpdateProfilePage() {

    const { user, authError } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { singleUser, userIsLoading, userError } = useSelector((state) => state.user)
    const theme = localStorage.getItem('theme')


    useEffect(() => {
        if (user) {
            dispatch(getSingleUserAction(user?._id)).catch((msg) => notify("error",msg))
        }
    }, [user])

    const handleUpdate = (data) => {
        const formData = new FormData()
        if (!data?.fullname?.trim()) {
            notify('error', "Fullname required")
            return
        }
        formData.append("fullname", data?.fullname)
        formData.append("university", data?.university)
        formData.append("field", data?.field)
        if (data?.gender) {

            formData.append("gender", data?.gender)
        }
        formData.append("phone", data?.phone)
        if (data?.profilePic) {

            formData.append("profilePic", data?.profilePic)
        }
        console.log("asdfsf");
        

        if (user) {
            dispatch(updateUserAction(user._id, formData)).then((msg) => notify('success', msg)).catch((msg) => notify("error", msg))
        } else {
            notify("error", "something went wrong")
        }
    }

    return (

        <>
            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>
                <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
                    Update Profile
                </Typography>
                {authError && <Typography>{authError}</Typography>}
                {userIsLoading ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", width: "100%" }} >
                    <CircularProgress sx={{ color: "var(--text-color)" }} size="30px" />
                </Box> : <UpdateProfileForm theme={theme} {...singleUser} handleUpdate={handleUpdate} isLoading={userIsLoading} error={authError} />}
            </Box>

        </>

    )
}

export default UpdateProfilePage