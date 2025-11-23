import { Box, List, ListItem, Typography } from '@mui/material'
import React from 'react'

function ProfilePage() {
  return (
    <Box

      sx={{ width: "100%", height: "91vh", display: "flex", justifyContent: "space-between", backgroundColor: "var(--bg-color)", padding: "20px", }}
    >
      <Box sx={{ display: "flex", width: "74%", flexDirection: "column", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex", height: "48%", justifyContent: "space-between" }}>
          <Box sx={{ borderTopLeftRadius: "10px", width: "40%", background: "#fff", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", flexDirection: "column", gap: '5px', alignItems: "center", display: "flex", justifyContent: "center" }}>


            <Box sx={{ height: '58%', borderRadius: '50%' }} component={'img'} src='https://media.licdn.com/dms/image/v2/D5603AQHzB2MM4hjZyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721399984734?e=2147483647&v=beta&t=GexUxYdCQ6dihCZYDE16KmokvHOslYZ7OeeepyR8br0' />
            <Typography fontWeight={'bold'} fontSize={'18px'} color='var(--text-color)'>Irtaza Ahmed Khatri</Typography>
            <Typography fontSize={'12px'} color='#9f9f9f'>example@gmail.com</Typography>

          </Box>
          <Box
            sx={{
              borderTopRightRadius: "10px",
              width: "59%",
              background: "#fff",
              padding: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <List sx={{display:"flex", flexWrap:"wrap"}}>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Username</Typography>
                <Typography fontSize="13px" color="var(--text-color)">irtaza123</Typography>
              </ListItem>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Full Name</Typography>
                <Typography fontSize="13px" color="var(--text-color)">Irtaza Ahmed</Typography>
              </ListItem>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Email</Typography>
                <Typography fontSize="13px" color="var(--text-color)">example@gmail.com</Typography>
              </ListItem>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">University</Typography>
                <Typography fontSize="13px" color="var(--text-color)">ABC University</Typography>
              </ListItem>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Field</Typography>
                <Typography fontSize="13px" color="var(--text-color)">Computer Science</Typography>
              </ListItem>

              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Phone Number</Typography>
                <Typography fontSize="13px" color="var(--text-color)">0312-1234567</Typography>
              </ListItem>
              <ListItem sx={{ display: "flex",flexDirection:"column",alignItems:"start",width:"30%", textAlign:"start"  }}>
                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Gender</Typography>
                <Typography fontSize="13px" color="var(--text-color)">Male</Typography>
              </ListItem>


            </List>
          </Box>
        </Box>

        <Box sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", width: "100%", height: "51%", background: "#fff", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}></Box>

      </Box>

      <Box sx={{ display: "flex", width: "25%", borderRadius: "10px", background: "#fff", height: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", flexDirection: "column", justifyContent: "space-between" }} >

      </Box></Box>
  )
}

export default ProfilePage