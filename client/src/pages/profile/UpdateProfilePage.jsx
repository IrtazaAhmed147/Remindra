import React from 'react'
import UpdateProfileForm from '../../components/forms/UpdateProfileForm'
import { Box, Typography } from '@mui/material'

function UpdateProfilePage() {
    return (

        <>
            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>
                <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
                    Update Profile
                </Typography>
                <UpdateProfileForm />
            </Box>

        </>

    )
}

export default UpdateProfilePage