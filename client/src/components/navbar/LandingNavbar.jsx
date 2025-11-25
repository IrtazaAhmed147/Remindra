import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function LandingNavbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between"}}>
                    <Link to={'/'}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: '#000',
                            textDecoration: 'none',
                        }}
                        >
                        My Idea
                    </Typography>

                        </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#000"
                        >
                            <MenuIcon />
                        </IconButton>
                        
                    </Box>

                    <Link to={'/'}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: '#000',
                            textDecoration: 'none',
                        }}
                        >
                        My Idea
                    </Typography>
                        </Link>
                 
                    <Box sx={{ flexGrow: 0 }}>

                        <Link to={`/login`}>
                            <Button
                                sx={{
                                    px: 2,
                                    // width: "150px",
                                    height: "35px",
                                    borderRadius: "6px",
                                    background: "var(--primary-color)",
                                    color: "#fff",
                                    mr: 1,
                                    textTransform: "capitalize",
                                    fontSize: "13px",
                                    ":hover": { backgroundColor: "#1258ad" },
                                }}
                            >
                             <LoginIcon sx={{mr:1}}/>   Sign In
                            </Button>
                        </Link>
                        <Link to={`/signup`}>
                            <Button
                                sx={{
                                    px: 2,
                                    // width: "150px",
                                    height: "35px",
                                    borderRadius: "6px",
                                    background: "var(--primary-color)",
                                    color: "#fff",
                                    textTransform: "capitalize",
                                    fontSize: "13px",
                                    ":hover": { backgroundColor: "#1258ad" },
                                }}
                            >
                              <PersonAddIcon  sx={{mr:1}}/>  Sign Up
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default LandingNavbar;
