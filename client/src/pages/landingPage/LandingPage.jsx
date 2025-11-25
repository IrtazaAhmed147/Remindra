import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import LandingNavbar from '../../components/navbar/landingNavbar'
import FeatureCard from '../../components/cards/FeatureCard'
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteIcon from '@mui/icons-material/Note';
import LandingPageFooter from '../../components/footer/LandingPageFooter';
import { Link } from 'react-router-dom';

function LandingPage() {

  const features = [
    { icon: <BookIcon sx={{ fontSize: 50, color: '#2A7DE1' }} />, title: 'Courses', description: 'All your courses in one place.' },
    { icon: <AssignmentIcon sx={{ fontSize: 50, color: '#2A7DE1' }} />, title: 'Assignments', description: 'Track and manage all your tasks easily.' },
    { icon: <QuizIcon sx={{ fontSize: 50, color: '#2A7DE1' }} />, title: 'Quizzes', description: 'Prepare and test your knowledge anytime.' },
    { icon: <NoteIcon sx={{ fontSize: 50, color: '#2A7DE1' }} />, title: 'Notes', description: 'Keep your study notes organized and accessible.' },
  ];
  return (
    <>

      <Box sx={{ minHeight: "100vh", width: "100%", backgroundColor: "var(--bg-color)", }}>
        <LandingNavbar />
        <Box px={'10px'}>



          <Box id='top' sx={{ mt: 2, width: "100%", height: { xs: "auto", sm: "auto", md: "400px" }, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <Box sx={{ paddingRight: "20px", display: "flex", justifyContent: "center", flexDirection: "column", width: { xs: "100%", sm: "100%", md: "49%" }, height: "100%" }}>
              <Typography mb={1} lineHeight={1} fontWeight={'bold'} sx={{ fontSize: { xs: "25px", sm: '33px', md: '40px' } }} >Keep Your University Work Flowing Smoothly.</Typography>
              <Typography mb={4} fontSize={'16px'}>Organize, collaborate, and manage your courses
                all in one flow.</Typography>
                <Link to={'/signup'}>
              <Button
                sx={{
                  px: 2,
                  width: "200px",
                  mb: 1,
                  height: "40px",
                  borderRadius: "6px",
                  background: "var(--primary-color)",
                  color: "#fff",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  ":hover": { backgroundColor: "#1258ad" },
                }}
                >
                Get Started
              </Button>
                </Link>
            </Box>

            {/* image box */}
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "49%" }, height: "100%" }}>

              <Box component={'img'} sx={{ width: "100%", maxHeight: "100%" }} src='/heroImage.png ' />

            </Box>
          </Box>


          <Box mb={3} id='features'>
            <Typography mb={1} variant='h3' >Features</Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: "wrap" }}>

              <FeatureCard
                title="Manage Courses Easily"
                description="Create, organize, and access all your university courses in one dashboard"
              />

              <FeatureCard
                title="Secure Data"
                description="All user information is handled with strong security measures."
              />

              <FeatureCard
                title="Upload & Access Resources"
                description="Keep notes, PDFs, and images safely stored and shared."
              />
              <FeatureCard
                title="Stay Updated"
                description="Get notified about tasks and updates instantly."
              />
            </Box>

          </Box>


          <Box id='about' sx={{ py: 6, px: { xs: 2, md: 8 }, }}>
            <Typography variant="h3" mb={3} sx={{ fontWeight: 'bold', textAlign: 'center', }}>
              About Our Platform
            </Typography>

            <Typography variant="body1" mb={5} sx={{ fontSize: '16px', textAlign: 'center', maxWidth: 800, mx: 'auto', color: '#555' }}>
              Our platform makes it easier for you to manage your studies. It brings all your learning materials into one organized and easy-to-use space. Everything is kept in order and easy to access whenever you need it. Focus on what matters most: <strong>learning well</strong> and <strong>keeping up with your studies</strong>.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <BookIcon sx={{ fontSize: 50, color: '#2A7DE1', mb: 2 }} />
                  <Typography variant="h6" mb={1}>Courses</Typography>
                  <Typography variant="body2" color="textSecondary">All your courses in one place.</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <AssignmentIcon sx={{ fontSize: 50, color: '#2A7DE1', mb: 2 }} />
                  <Typography variant="h6" mb={1}>Assignments</Typography>
                  <Typography variant="body2" color="textSecondary">Track and manage all your tasks easily.</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <QuizIcon sx={{ fontSize: 50, color: '#2A7DE1', mb: 2 }} />
                  <Typography variant="h6" mb={1}>Quizzes</Typography>
                  <Typography variant="body2" color="textSecondary">Prepare and test your knowledge anytime.</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <NoteIcon sx={{ fontSize: 50, color: '#2A7DE1', mb: 2 }} />
                  <Typography variant="h6" mb={1}>Notes</Typography>
                  <Typography variant="body2" color="textSecondary">Keep your study notes organized and accessible.</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>




        </Box>
        <LandingPageFooter />
      </Box>
    </>
  )
}

export default LandingPage