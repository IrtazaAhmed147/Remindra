import { Box, Typography, Link } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--primary-color)",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "13px",
      }}
    >
      {/* Left Text */}
      <Typography sx={{ fontSize: "12px" }}>
        © {new Date().getFullYear()} MyIdea - All rights reserved.
      </Typography>

      {/* Right Links */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link underline="none" sx={{ color: "#fff", fontSize: "12px" }}>
          Privacy
        </Link>
        <Link underline="none" sx={{ color: "#fff", fontSize: "12px" }}>
          Terms
        </Link>
        <Link underline="none" sx={{ color: "#fff", fontSize: "12px" }}>
          Support
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
