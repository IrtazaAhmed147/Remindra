import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import CustomizeLoader from './CustomizeLoader'

function FullPageLoader() {
  return (
    <Box sx={{width:"100%", minHeight:"100vh",position:"absolute",zIndex:9999, top:0, left:0,display:"flex",justifyContent:"center", alignItems:"center" }}>
        <CustomizeLoader color='inherit' sx={{margin:'auto'}} size={'20px'}/>
    </Box>
  )
}

export default FullPageLoader