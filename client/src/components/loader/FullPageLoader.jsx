import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function FullPageLoader() {
  return (
    <Box sx={{width:"100%", height:"100%    ",position:"absolute",zIndex:88, top:0,backgroundColor:"#0000001c", left:0,display:"flex", }}>
        <CircularProgress color='inherit' sx={{margin:'auto'}} size={'20px'}/>
    </Box>
  )
}

export default FullPageLoader