import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Box
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const AccountStatusDialog = ({
    open = true,
    status = "suspended", // "suspended" | "deactivated"
}) => {
    const isSuspended = status.includes("suspended");

    return (
        <Dialog
            open={open}
            disableEscapeKeyDown
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle sx={{ textAlign: "center" }}>
                <WarningAmberIcon
                    sx={{
                        fontSize: 48,
                        color: isSuspended ? "#f57c00" : "#d32f2f",
                        mb: 1,
                    }}
                />
                <Typography variant="h6" fontWeight={600}>
                    Account {isSuspended ? "Suspended" : "Deactivated"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    Your account has been{" "}
                    <strong>
                        {isSuspended ? "temporarily suspended" : "deactivated"}
                    </strong>
                    . Please contact support for further assistance.
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        📧 <strong>support@yourdomain.com</strong>
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color={isSuspended ? "warning" : "error"}
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() =>
                        window.location.href = "mailto:support@yourdomain.com"
                    }
                >
                    Contact Support
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AccountStatusDialog;
