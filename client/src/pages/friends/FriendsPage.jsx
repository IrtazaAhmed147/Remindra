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
  MenuItem,
  Tabs,
  Tab,
  Badge,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MailIcon from '@mui/icons-material/Mail';
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import RemoveModal from "../../components/modal/RemoveModal";

const options = ["Remove", "Give Access"];
const ITEM_HEIGHT = 48;

export default function FriendsPage() {
  const [tab, setTab] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (option) => {
    setAnchorEl(null);
    if (option === "Remove") setOpenModal(true);
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

  const invitations = [
    { name: "Hamza Ali", username: "hamza45", img: "" },
    { name: "Zara Qureshi", username: "zara_q", img: "" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "10px", sm: "20px", md: "20px" },
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}
      <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 2 }}>
        Friends
      </Typography>

      {/* TABS */}
      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { fontSize: "12px", textTransform: "none", p: 0 },
          "& .Mui-selected": { color: "var(--primary-color)" },
          "& .MuiTabs-indicator": { background: "var(--primary-color)" },
        }}
      >
        <Tab label="My Friends" />
        <Tab label="Add New" />
        <Tab label={ <Badge sx={{"& .MuiBadge-badge":{top:"-5px",right:"-5px"}}} badgeContent={0} color="primary">
          Invitation </Badge>
        } />
      </Tabs>

      {tab === 0 && (
        <Box>
          {friends.map((f, i) => (
            <Card
              key={i}
              sx={{
                mb: 1.5,
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "5px", sm: 2, md: 2 },
                  p: "10px !important",
                }}
              >
                <Avatar src={f.img} sx={{ width: 40, height: 40 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {f.name}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    @{f.username}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    {f.university}
                  </Typography>
                </Box>

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
                      boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search new friends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                background: "#fff",
                borderRadius: "8px 0 0 8px",
                "& fieldset": { border: "none" },
              }}
              inputProps={{ style: { fontSize: "12px" } }}
            />

            <IconButton
              sx={{
                background: "#fff",
                borderRadius: "0 8px 8px 0",
                "&:hover": { background: "#f0f0f0" },
              }}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {searchResults.map((u, i) => (
            <Card
              key={i}
              sx={{
                mb: 1.5,
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "5px", sm: 2, md: 2 },
                  p: "10px !important",
                }}
              >
                <Avatar src={u.img} sx={{ width: 40, height: 40 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {u.name}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    @{u.username}
                  </Typography>
                </Box>

                <Button
                  sx={{
                    fontSize: "11px",
                    textTransform: "none",
                    background: "#10b981",
                    color: "#fff",
                    width: "45px",
                    minWidth: "auto ",
                    borderRadius: "6px",
                    px: 1,
                    "&:hover": { background: "#059669" },
                  }}
                >
                  <PersonAddIcon fontSize="small" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 2 && (
        <Box>
          {invitations.map((u, i) => (
            <Card
              key={i}
              sx={{
                mb: 1.5,
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "5px", sm: 2, md: 2 },
                  p: "10px !important",
                }}
              >
                <Avatar src={u.img} sx={{ width: 40, height: 40 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {u.name}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    @{u.username}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    background: "#ef4444",
                    color: "#fff",
                    width: 34,
                    height: 34,
                    "&:hover": { background: "#dc2626" },
                  }}
                  onClick={()=> setOpenModal(true)}
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>

                <IconButton
                  sx={{
                    background: "#10b981",
                    color: "#fff",
                    width: 34,
                    height: 34,
                    "&:hover": { background: "#059669" },
                  }}
                >
                  <DoneIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

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
