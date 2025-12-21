import { Box, Typography } from '@mui/material'
import React from 'react'

function DashStatCard({title, icon, stats}) {
  return (
     <Box
              sx={{
                width: { xs: "45%", sm: "48%", md: "23%" },
                backgroundColor: "var(--card-bg-color)",
                borderRadius: "12px",
                padding: { xs: "10px", sm: "15px", md: "15px" },
                boxShadow: "0px 4px 15px rgba(0,0,0,0.12)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.18)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              {/* Title + Icon */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                {icon}
                <Typography sx={{ fontSize: { xs: "16px", sm: "20px", md: "25px" } }} fontWeight="bold" color="var(--text-color)">
                  {title}
                </Typography>
              </Box>

              {/* Stats */}
              {stats.map((stat, i) => (
                <Typography key={i} fontSize="13px" color="var(--text-color)">
                  {stat.label}: <b>{stat.value}</b>
                </Typography>
              ))}
            </Box>
  )
}

export default DashStatCard