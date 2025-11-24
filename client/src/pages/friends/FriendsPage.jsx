import {
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import RemoveModal from "../../components/modal/RemoveModal";

const options = ["Remove", "Give Access"];

const ITEM_HEIGHT = 48;

export default function FriendsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = (option) => {
    setAnchorEl(null);

    if (option === "Remove") {
      setOpenModal(true); // OPEN MODAL PROPERLY
    }
  };

  const [search, setSearch] = useState("");

  const friends = [
    { name: "Ali Raza", username: "ali01", university: "FAST", img: "" },
    { name: "Sara Khan", username: "sara_k", university: "UET", img: "" },
  ];

  const searchResults = [
    { name: "Ahmad Nawaz", username: "ahmad22", img: "" },
    { name: "Maria Ahmed", username: "maria_a", img: "" },
  ];

  return (
    <Box sx={{ width: "100%", p: 2, background: "#F1F5F9", minHeight: "100vh" }}>

      <Typography sx={{ fontSize: "40px", fontWeight: 700, mb: 2 }}>
        Friends
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        
        {/* FRIENDS LIST */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}>
            Your Friends
          </Typography>

          {friends.map((f, i) => (
            <Card key={i} sx={{ mb: 1.5, borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: "8px !important" }}>
                <Avatar src={f.img} sx={{ width: 40, height: 40 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {f.name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
                    @{f.username}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
                    {f.university}
                  </Typography>
                </Box>

                <Box>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        borderRadius: "10px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={() => handleClose(option)}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

              </CardContent>
            </Card>
          ))}
        </Box>

        {/* SEARCH */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}>
            Add New Friends
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search new friends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                background: "#fff",
                borderRadius: "8px 0 0 8px",
                height: "36px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                },
              }}
              inputProps={{ style: { fontSize: "12px" } }}
            />

            <IconButton
              sx={{
                background: "#fff",
                borderRadius: "0 8px 8px 0",
                "&:hover": { background: "#f5f5f5" },
              }}
            >
              <SearchIcon sx={{ fontSize: "20px", color: "#333" }} />
            </IconButton>
          </Box>

          {searchResults.map((u, i) => (
            <Card key={i} sx={{ mb: 1.5, borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: "8px !important" }}>
                <Avatar src={u.img} sx={{ width: 40, height: 40 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {u.name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
                    @{u.username}
                  </Typography>
                </Box>

                <Button
                  size="small"
                  sx={{
                    fontSize: "11px",
                    textTransform: "none",
                    background: "#2A7DE1",
                    color: "#fff",
                    borderRadius: "6px",
                    px: 1.5,
                    "&:hover": { background: "#1E64B7" },
                  }}
                >
                  Add Friend
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* FIXED MODAL CALL */}
      <RemoveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
        title="Remove Friend"
        description="Do you really want to remove this friend?"
      />

    </Box>
  );
}
