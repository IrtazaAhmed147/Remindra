import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import api from "../utils/common.js";


import UserTable from "../components/tables/userTable";
import axios from "axios";

const AdminDashboard = () => {
  // Hardcoded data
  const stats = {
    totalUsers: 120,
    totalCourses: 45,
    totalMaterials: 200,
    last24hUsers: 3,
    last24hCourses: 2,
  };

  const coursesData = [
    { id: 1, title: "React Basics", creator: "Ali", materials: 5, sharedWith: 3 },
    { id: 2, title: "JS Fundamentals", creator: "Sara", materials: 8, sharedWith: 5 },
    { id: 3, title: "Python Intro", creator: "Ahmed", materials: 3, sharedWith: 2 },
  ];
  const handleReminder = async ()=> {
    console.log("remidner");
    // return;
    try {
              const token = localStorage.getItem("token");
              // const subscriptionId = OneSignal.User.PushSubscription.id;

      
              const res = await axios.post(
                  `http://localhost:3200/api/notification/send-test`,
                  {message: "Hey! Check your tasks."},
                  {
                      headers: { Authorization: `Bearer ${token}` },
                      withCredentials: true,
                  }
              );
      console.log(res);
      
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {[ 
          { label: "Total Users", value: stats.totalUsers },
          { label: "Total Courses", value: stats.totalCourses },
          { label: "Total Materials", value: stats.totalMaterials },
          { label: "New Users (24h)", value: stats.last24hUsers },
          { label: "New Courses (24h)", value: stats.last24hCourses },
        ].map((item) => (
          <Card
            key={item.label}
            sx={{ flex: "1 1 150px", minWidth: 120, boxShadow: 3 }}
          >
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#6b7280" }}>
                {item.label}
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5, fontSize: 20 }}>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

        <Button variant="contained" color="primary" onClick={()=> handleReminder()}>Send Reminder</Button>

      {/* User Management */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          User Management
        </Typography>
        <UserTable />
      </Box>

      {/* Course Management */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Course Management
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["ID", "Title", "Creator", "Materials", "Shared With", "Actions"].map((head) => (
                  <TableCell key={head} sx={{ fontSize: 12, fontWeight: 600 }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {coursesData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell sx={{ fontSize: 12 }}>{course.id}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{course.title}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{course.creator}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{course.materials}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{course.sharedWith}</TableCell>

                  <TableCell sx={{ fontSize: 12 }}>
                    <Button size="small" variant="contained" sx={{ mr: 1, fontSize: 10 }}>
                      View
                    </Button>
                    <Button size="small" variant="outlined" color="error" sx={{ fontSize: 10 }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
