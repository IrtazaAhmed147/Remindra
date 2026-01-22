import {
  Card, CardContent, Typography, IconButton, Box,
  Menu,
  MenuItem,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const menuOptions = ["Download", "Delete"];
const FileCard = ({ fileName, fileSize, fileUrl, fileType, id, isDownloadBtn, askDelete, handleDownload, }) => {


  const isPdf = fileType?.includes("pdf") || false;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Card
      sx={{
        maxWidth: '100%',
        backgroundColor:"var(--card-bg-color)",
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        mb: 1,
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 1,p:'10px',pb:'10px !important',justifyContent:"space-between" }}>

        {/* File Icon */}
        <Box>
          {isPdf ? (
            <PictureAsPdfIcon color="error" sx={{ fontSize: 30 }} />
          ) : (
            <InsertDriveFileIcon color="primary" sx={{ fontSize: 30 }} />
          )}
        </Box>

        {/* File Info */}
        <Box sx={{ flexGrow: 1 ,overflow:"hidden"}}>
          <Typography sx={{fontSize:{xs:"13px",sm:"14px",md:"16px"}, color:"var(--text-color)"}}>
            {fileName}
          </Typography>
          <Typography sx={{fontSize:{xs:"11px",sm:"11px",md:"11px"}, color:"var(--text-color)"}}  color="text.secondary">
            {fileSize}
          </Typography>
        </Box>

        {/* Action */}{isDownloadBtn &&

          <Box sx={{ display: "flex" }}>
            <IconButton
              // sx={{ p:  }}
              size="small"

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
                    if (option === "Delete") askDelete(id);

                    if (option === "Download") handleDownload(fileUrl, fileName);
                    setAnchorEl(null);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        }

      </CardContent>
    </Card>
  );
};

export default FileCard;
