import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function UpdateProfileForm() {
    return (
        <>

            <form className="form" style={{ paddingTop: '10px', width: "100%", marginTop: '10px', flexDirection: "row" }}  >


                <Box sx={{ width: "350px", borderRadius: "20px", bgcolor: "#b3dde2", display: "flex", justifyContent: "center", alignItems: "center", height: "450px",flexDirection:"column",gap:'8px' }}>

                    <Box sx={{ height: '240px', width: "240px", bgcolor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: '50%',position:"relative" }}>


                        <Box sx={{ height: '95%', borderRadius: '50%' }} component={'img'} src='https://media.licdn.com/dms/image/v2/D5603AQHzB2MM4hjZyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721399984734?e=2147483647&v=beta&t=GexUxYdCQ6dihCZYDE16KmokvHOslYZ7OeeepyR8br0' />


                    
                        <label
                            htmlFor="fileUpload"
                            style={{
                                bottom:'24px',
                                right:'8px',
                                position:"absolute",
                                backgroundColor: "var(--primary-color)",
                                color: "#fff",
                                borderRadius: "50%",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent:"center",
                                alignItems:"center",
                                border:"3px solid #fff",
                                height:"40px",
                                width:"40px"
                            }}
                        >
                             <CameraAltIcon /> 
                        </label>

                        <input
                            id="fileUpload"
                            type="file"
                            style={{ display: "none" }}
                        />

                    </Box>

                    <Typography color='var(--text-color)'>Username</Typography>

                </Box>
                <Box sx={{ width: "60%" }}>


                    <Box className="flex-column">
                        <label>FullName </label></Box>
                    <Box className="inputForm">
                        <input placeholder="Enter your fullname" name='fullname' className="input" type="text" required />
                    </Box>
                    <Box className="flex-column">
                        <label>University</label></Box>
                    <Box className="inputForm">
                        <input placeholder="Enter your university" name='university' className="input" type="text" required />
                    </Box>
                    <div className="flex-column">
                        <label>Gender </label></div>
                    <Select sx={{ width: '100%', height: '50px', backgroundColor: '#fff' }} defaultValue={'select gender'}>

                        <MenuItem value='select gender'>Select Gender</MenuItem>
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                    </Select>







                    {/* {error && <p>{error}</p>} */}
                    <button className="btn">
                        {/* {isLoading && <CircularProgress color="inherit" size="20px" />} */}

                        Update Profile</button>

                </Box>
            </form>

        </>
    )
}

export default UpdateProfileForm