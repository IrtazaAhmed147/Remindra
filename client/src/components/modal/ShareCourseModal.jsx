import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Checkbox,
  Card,
  CardContent,
  Avatar,
  FormControlLabel,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from "@mui/icons-material/Search";
import { Form } from "react-router-dom";

export default function ShareCourseModal({
  open,
  onClose,
  onShare,
  userList,
  members = [],
  loading,
  searchUser,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {

  //   if (!open) return;
  //   const timer = setTimeout(async () => {
  //     const result = await searchUser(searchTerm, members);
  //     setUsers(result || []);
  //   }, 400);

  //   return () => clearTimeout(timer);
  // }, [searchTerm, open]);

  useEffect(() => {
    if (!loading && userList && open) {
      const filtered = userList.filter(
        (u) => u._id !== user._id && !members.includes(u._id)
      );
      setUsers(filtered);
    }
  }, [loading, userList, open]);



  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setSelectedUsers([]);
      setUsers([]);
    }
  }, [open]);

  const handleToggle = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleShareClick = () => {
    onShare(selectedUsers);
    onClose();
  };

  return (
    <Dialog
      open={open}
      disableRestoreFocus
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "var(--card-bg-color)",
          borderRadius: 3,
          width: {xs:"90%",sm:400,md:400},
          minHeight: "400px",
          margin:0,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShareIcon sx={{ color: "#2a7de1" }} />
        <Typography fontWeight={600} fontSize={16} >
          Share Course Access
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>
          Search by username and select users to grant course access.
        </Typography>

        <form sx={{ display: "flex", mb: 2 }}
          onSubmit={(e) => {
            e.preventDefault()
            searchUser(searchTerm, members)
          }} >

          <TextField
            size="small"
            fullWidth
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              background: "var(--input-bg-color)",
              borderRadius: "8px",
              width:"85%",
              "& fieldset": { border: "none" },
            }}
            inputProps={{
              style: { fontSize: "12px", color: "var(--text-color)" },
            }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
                opacity: 0.9,
              },
              borderRadius: "8px",
              height: "30px",
              width: "35px",
            }}
          >
            <SearchIcon sx={{fontSize:"18px"}}/>
          </IconButton>
        </form>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", minHeight: "150px", alignItems: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <Box sx={{ maxHeight: 250, overflowY: "auto" }}>
            {users?.map((u) => (
              <Card key={u._id} sx={{ mb: 1, bgcolor: "var(--share-box-bg)", borderRadius: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: "10px !important",
                  }}
                >
                  <Avatar src={u.profilePic} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontSize={14} fontWeight={600}>
                      {u.fullname}
                    </Typography>
                    <Typography fontSize={11} color="#64748B">
                      @{u.username}
                    </Typography>
                    <Typography fontSize={11} color="#64748B">
                      {u.university}
                    </Typography>
                  </Box>

                  {u?.inviteStatus === "pending" ? <AccessTimeIcon sx={{ fontSize: "25px" }} /> : <Checkbox
                    disabled={members.includes(u._id)}
                    checked={
                      members.includes(u._id) ||
                      selectedUsers.includes(u._id)
                    }
                    onChange={() => handleToggle(u._id)}
                  />}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }} autoFocus>
        <Button onClick={onClose} size="small">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ background: "#04a40e" }}
          disabled={!selectedUsers.length}
          onClick={handleShareClick}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
}
