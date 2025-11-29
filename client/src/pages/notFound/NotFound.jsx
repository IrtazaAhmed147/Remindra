import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import LandingNavbar from '../../components/navbar/LandingNavbar'
import LandingPageFooter from '../../components/footer/LandingPageFooter'

function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh",display:"flex",flexDirection:"column",justifyContent:"space-between", width: "100%", backgroundColor: "var(--bg-color)", }}>
      <LandingNavbar  authBtn={false}/>
    <div style={{textAlign: 'center', display:'flex' }}>
        <div style={{margin: 'auto'}}>

        <h1 style={{fontSize: '50px'}}>404</h1>
        <h1 style={{fontSize: '30px', marginBottom: '10px'}}>Oops! The page you're looking for does not exist.</h1>
        <Button variant="contained">
            <Link to='/' style={{color:'white', textDecoration: 'none'}}>Go Back Home</Link>
        </Button>
        
        </div>
    </div>
    <LandingPageFooter />
    </Box>
  )
}

export default NotFound