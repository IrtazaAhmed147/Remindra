import { Box, Typography } from '@mui/material'
import React from 'react'

function NotificationCard({name, msg, course , time}) {
    return (
        <Box sx={{mt:1,  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "60px", padding: "10px", backgroundColor: "#fff", display: "flex",gap:'10px',alignItems:"center" ,borderRadius:"5px"}}>

            <Box sx={{height:"100%"}}>
                <Box sx={{ height: '100%', borderRadius: '50%' }} component={'img'} src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' />
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