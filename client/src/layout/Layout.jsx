import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Box } from '@mui/material';
import { useState } from 'react';

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>

                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)",   transition: 'margin 0.3s ease-in-out', marginLeft: collapsed ? '80px' : '260px', marginTop: '68px' }}>

                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Layout;
