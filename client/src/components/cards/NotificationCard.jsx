import { Box, Typography } from '@mui/material'
import React from 'react'

function NotificationCard({name, msg, course , time}) {
    return (
        <Box sx={{mt:1,  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "60px", padding: "10px", backgroundColor: "#fff", display: "flex",gap:'10px',alignItems:"center" ,borderRadius:"5px"}}>

            <Box sx={{height:"100%"}}>
                <Box sx={{ height: '100%', borderRadius: '50%' }} component={'img'} src='https://media.licdn.com/dms/image/v2/D5603AQHzB2MM4hjZyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721399984734?e=2147483647&v=beta&t=GexUxYdCQ6dihCZYDE16KmokvHOslYZ7OeeepyR8br0' />
            </Box>
            <Box>
                <Box sx={{display:'flex',gap:'5px'}}>

                 <Typography  fontSize={'14px'} fontWeight={"bold"} color='var(--text-color)'>{name}</Typography>
                <Typography   fontSize={'14px'} color='#575757ff'>{msg} in</Typography>
                 <Typography  fontSize={'14px'} fontWeight={"bold"} color='var(--text-color)'>{course}</Typography>
                </Box>
                <Typography fontSize={'12px'} color='#9f9f9f'>{time} ago</Typography>

            </Box>

        </Box>
    )
}

export default NotificationCard