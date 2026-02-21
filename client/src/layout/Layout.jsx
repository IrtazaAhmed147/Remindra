import Navbar from '../components/navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Box } from '@mui/material';
import { useState } from 'react';
import Footer from '../components/footer/Footer';
import { unSubscribe } from '../redux/actions/settingActions';
import OneSignal from 'react-onesignal';
import { userReset } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../utils/HelperFunctions';

const Layout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const unsubscribe = async () => {
        // await OneSignal.User.PushSubscription.optOut();


        dispatch(unSubscribe(user._id)).then(() => {
            localStorage.removeItem('token');
            dispatch(userReset());
            navigate('/login');
            notify('success', 'User logged out successfully');
        }).catch((msg) => notify("error", msg));
    }

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ display: { xs: "none", md: "block" } }}>


                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                </Box>
                <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)", transition: 'margin 0.3s ease-in-out', marginLeft: { xs: '0px', sm: '0px', md: collapsed ? '80px' : '260px' } }}>
                    <Navbar unsubscribe={unsubscribe} />

                    <Outlet />

                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default Layout;
