import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/HelperFunctions";
import { useSelector } from "react-redux";

const menuOptions = ["Edit Course", "Share", "Delete"];

function CourseCard({
  title,
  description,
  members,
  isShow = true,
  resources,
  updatedAt,
  _id,
  owner,
  askDelete,
  setShareModalOpen,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isOwner = owner?._id === user?._id;

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", sm: "48%", md: "32%" },
        backgroundColor: "var(--card-bg-color)",
        borderRadius: "16px",
        p: 2,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* LEFT ROLE INDICATOR */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "5px",
          backgroundColor: isOwner
            ? "var(--primary-color)"
            : "#7C3AED",
        }}
      />


      <Box sx={{ height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}>

            <Typography
              fontSize="17px"
              fontWeight={700}
              color="var(--text-color)"
              sx={{ pr: 1 }}
            >
              {title}
            </Typography>

          </Box>

          {(isOwner && isShow) && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
              <IconButton
                // sx={{ p:  }}
                size="small"
                sx={{color:"var(--text-color)"}}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setAnchorEl(e.currentTarget)
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={(e) => {
                      if (option === "Delete") askDelete(_id);
                      if (option === "Edit Course")
                        navigate(`/add/course?id=${_id}&type=edit`);
                      if (option === "Share") setShareModalOpen(_id);
                      setAnchorEl(null);
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Box>
        <Link
          to={isOwner ? `/course/${_id}/` : `/course/${_id}/resources`}
          style={{ textDecoration: "none", height: '100%', display: "flex", flexDirection: "column", justifyContent: 'space-between' }}
        >
          {/* OWNER INFO */}
          {!isOwner && (
            <Typography
              fontSize="11px"
              color="#6b7280"
              sx={{ mb: 1 }}
            >
              Shared By: <b>{owner?.username}</b>
            </Typography>
          )}

          {/* DESCRIPTION */}
          <Typography
            // minHeight={'90px'}
            fontSize="13px"
            color="#6b7280"
            sx={{ mb: 1 }}
          >
            {description?.slice(0, 90)}
          </Typography>


          {/* STATS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
              borderTop: "1px solid var(--text-color)",
              pt: 1,
            }}
          >

            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <FolderOutlinedIcon sx={{ fontSize: 16, color: "#64748B" }} />
              <Typography fontSize="12px" color="var(--text-color)">
                {resources?.length || 0} {resources?.length > 1 ? "Rescoures" : "Rescoure"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <GroupOutlinedIcon sx={{ fontSize: 16, color: "#64748B" }} />
              <Typography fontSize="12px" color="var(--text-color)">
                {members?.length || 0} {members?.length > 1 ? "Members" : "Member"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <UpdateOutlinedIcon sx={{ fontSize: 16, color: "#64748B" }} />
              <Typography fontSize="12px" color="var(--text-color)">
                {formatDate(updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      {/* ACTIONS */}
      {/* {isOwner && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => {
                  if (option === "Delete") askDelete(_id);
                  if (option === "Edit Course")
                    navigate(`/add/course?id=${_id}&type=edit`);
                  if (option === "Share") setShareModalOpen(_id);
                  setAnchorEl(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )} */}
    </Box>
  );
}

export default CourseCard;
