import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function RemoveModal({ open, onClose, onConfirm, title, description }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px", p: {xs:1,sm:2,md:2}, width: {xs:"95%",sm:"400px",md:"420px"},m:0,
          background: "var(--card-bg-color) !important",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1,p:{xs:1,sm:2,md:"16px 24px"} }}>
        <WarningAmberIcon sx={{ color: "#d32f2f" }} />
        <Typography fontSize={18} fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{p:{xs:1,sm:2,md:"16px 24px"}}}>
        <Typography fontSize={14} color="text.secondary">
          {description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", background: "#d32f2f" }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
