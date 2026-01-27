import { Box, Typography, Paper, TextField, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LandingNavbar from '../../components/navbar/LandingNavbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassAction } from '../../redux/actions/authActions';
import { notify } from '../../utils/HelperFunctions';

function ForgotPass() {
    const [email, setEmail] = useState("");
    const { authLoading, user } = useSelector((state) => state.auth)
    const [disableBtn, setDisableBtn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user])

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setDisableBtn(true); // immediately disable

            const msg = await dispatch(forgotPassAction(email));
            notify("success", msg);

            setTimeout(() => {
                setDisableBtn(false);
            }, 60000);

        } catch (error) {
            setDisableBtn(false); // enable again if error
            notify("error", error);
        }
    }

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <LandingNavbar authBtn={false} />

            <Box
                sx={{
                    width: '100%',
                    height: '85vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-color)',
                    px: 2
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: { xs: '95%', sm: '420px' },
                        p: 4,
                        borderRadius: "16px",
                        textAlign: "center",
                        backgroundColor: "#fff"
                    }}
                >
                    {/* Icon */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                backgroundColor: "#e8f0fe",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <LockOutlinedIcon sx={{ color: "#1a73e8", fontSize: 30 }} />
                        </Box>
                    </Box>

                    {/* Title */}
                    <Typography variant="h5" fontWeight={700} color="var(--text-color)">
                        Forgot Your Password?
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "var(--text-color)", mt: 1, opacity: 0.8 }}
                    >
                        No worries! Enter your registered email and we'll send you a reset link.
                    </Typography>

                    <form onSubmit={handleSubmit}  >

                        <Box className="inputForm" sx={{ mt: 2 }}>
                            <input placeholder="Email Address" name='email' className="input" type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </Box>
                        <button disabled={authLoading || disableBtn} className="btn">
                            {authLoading && <CircularProgress sx={{ color: "var(--text-color)" }} size="20px" />}

                            Send Reset Link</button>
                        {disableBtn && <Typography textAlign={'start'} fontSize={'12px'}>You can request a new link after 1min</Typography>}
                    </form>

                    {/* Back to login */}
                    <Typography sx={{ mt: 3, color: "var(--text-color)" }}>
                        Remember your password?{" "}
                        <Link to="/login" underline="hover" style={{ color: "#1a73e8" }} >
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default ForgotPass;
