import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userReset } from '../../redux/slices/authSlice';
import { notify } from '../../utils/HelperFunctions';
import Sidebar from '../sidebar/Sidebar.jsx';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [mobileSidebar, setMobileSidebar] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(userReset());
    navigate('/login');
    notify('success', 'User logged out successfully');
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="fixed" sx={{right:"auto", backgroundColor: 'var(--primary-color)', zIndex: 10,height:"40px" }}>
        <Container maxWidth="xl" sx={{height:"40px"}}>
          <Toolbar disableGutters sx={{maxHeight:"40px !important",minHeight:"40px !important"}}>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={() => setMobileSidebar(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo Mobile */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <Link to="/" style={{ color: '#fff' }}>My Idea</Link>
            </Typography>

            {/* Logo Desktop */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <Link to="/" style={{ color: '#fff' }}>My Idea</Link>
            </Typography>

            {/* Profile Avatar */}
            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                  <Avatar src="https://media.licdn.com/dms/image/v2/D5603AQHzB2MM4hjZyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721399984734?e=2147483647&v=beta&t=GexUxYdCQ6dihCZYDE16KmokvHOslYZ7OeeepyR8br0" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/account')}>Account</MenuItem>
                <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>

                {user && (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </Box> */}

          </Toolbar>
        </Container>
      </AppBar>

      {/* SPACING BELOW NAVBAR */}
      <Toolbar sx={{maxHeight:"40px !important",minHeight:"40px !important"}}/>

      {/* MOBILE SIDEBAR DRAWER */}
      <Drawer
        anchor="left"
        open={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 260, height: "100vh", bgcolor: "var(--bg-color)" }}>
          <Sidebar collapsed={false} mobileSidebar ={mobileSidebar}/>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
