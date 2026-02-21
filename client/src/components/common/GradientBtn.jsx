import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
function GradientBtn({icon, text, url}) {
    const navigate = useNavigate()
    return (
        <Box
            onClick={() => navigate(url)}
            sx={{
                width: { xs: "100%", sm: "auto", md: "250px" },
                p: {xs:"5px 7px",sm:"7px 9px",md:"10px 12px"},
                borderRadius: "14px",
                background: "var(--gradientBtn-color)",
                
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "0.25s ease",
                border: "1px solid rgba(0,0,0,0.05)",
                "&:hover": {
                    background: "var(--gradientBtn-hover-color)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                },
            }}
        >
            <Box
                sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    backgroundColor: "rgba(42, 125, 225, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                    {icon}
                            </Box>
            <Typography fontSize="14px" fontWeight="600" color="var(--text-color)">
                {text}
            </Typography>
        </Box>
    )
}

export default GradientBtn