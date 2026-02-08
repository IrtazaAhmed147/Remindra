import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material'

import {  useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
function ProfilePage() {

  const navigate= useNavigate()
  const { user } = useSelector((state) => state.auth)
  console.log(user);

  const { isLoading } = useSelector((state) => state.user)

  return (
    <>

      {isLoading && <> <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>  <CircularProgress  sx={{color:"var(--text-color)"}} size="30px" /> </Box></>}
      {!isLoading && <Box

        sx={{ width: "100%", height: "91vh", display: "flex", justifyContent: "space-between", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "0px !important", }}
      >
        <Box sx={{
          display: "flex", width: "100%",
          flexDirection: "column", justifyContent: "space-between"
        }}>

          <Box sx={{ width: "100%", justifyContent: "space-between", }}>
            <Box sx={{ borderTopLeftRadius: "10px", width: "100%", background: "var(--card-bg-color) !important", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "150px", gap: '10px', alignItems: "center", display: "flex", }}>


              <Box sx={{ height: '90%', borderRadius: '50%' }} component={'img'} src={user?.profilePic || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
              <Box>

                <Typography fontWeight={'bold'} fontSize={'30px'} color='var(--text-color)'>{user?.fullname}</Typography>
                <Typography fontSize={'14px'} color='#9f9f9f'>{user?.email || 'example@gmail.com'}</Typography>
              </Box>

            </Box>
            <Box
              sx={{
                borderTopRightRadius: "10px",
                width: "100%",
                background: "var(--card-bg-color) !important",
                mt: 3,
                padding: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              <List sx={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Username</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.username}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Full Name</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.fullname}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Email</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.email}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">University</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.university}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Field</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.field}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Phone Number</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.phone}</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Gender</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.gender}</Typography>
                </ListItem>


              </List>
            </Box>



            <Box
              onClick={() => navigate("/update/profile")}
              sx={{
                p: 3,
                mt: 3,
                mb: 3,
                borderRadius: 3,
                bgcolor: "var(--card-bg-color)",
                boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.06)
          `,
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
              }}
            >
              <Typography fontWeight={600} color="var(--text-color)">Update Profile</Typography>
              <Typography fontSize={12} color="var(--text-muted-color)">
                Edit your personal information
              </Typography>
            </Box>
          </Box>


        </Box>



      </Box>}
    </>
  )
}

export default ProfilePage