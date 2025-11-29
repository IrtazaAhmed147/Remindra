import { Box, Typography } from '@mui/material'
import React from 'react'
import NotificationCard from '../../components/cards/notificationCard'

function Notification() {
  return (
    <Box sx={{ width: "100%",minHeight:"100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt:"0px !important", }}>

        <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
          Notifications
        </Typography>

      <NotificationCard name={'ali'} msg={'added new materials'} course={'linear algebra'} time={'30min'} />
      <NotificationCard name={'john'} msg={'delete 4 materials'} course={'database'} time={'20min'} />
      <NotificationCard name={'maaz'} msg={'added new material'} course={'oop'} time={'1min'} />
      <NotificationCard name={'ahmed'} msg={'added new material'} course={'calculus'} time={'4hr'} />
      <NotificationCard name={'mubeen'} msg={'added new material'} course={'linear algebra'} time={'13min'} />
      <NotificationCard name={'ali'} msg={'added new material'} course={'linear algebra'} time={'15min'} />

    </Box>
  )
}

export default Notification