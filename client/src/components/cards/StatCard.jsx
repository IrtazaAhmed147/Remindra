import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'

function StatCard({label,value}) {
  return (
    
    <Card
      sx={{
        width: { xs: "47%", sm: "30%", md: "20%" },
        backgroundColor: "var(--card-bg-color)",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: { xs: "11px", sm: "12px", md: "13px" }, color:"var(--text-color)" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: { xs: "18px", sm: "20px", md: "22px" } }} fontWeight="bold" color="var(--text-color)">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard