import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../utils/common.js";

const SendEmail = () => {
  const { id } = useParams(); // user id from route

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token')
    console.log(token);
    
  // Step 1: Get user email from id
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await api.get(`/user/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }); 
    console.log(res);
    
        setEmail(res.data?.data?.email);
      } catch (err) {
        console.log(err);
      }
    };

    getUserEmail();
  }, [id]);

  // Step 2: Send email
  const handleSendEmail = async () => {
    try {
      setLoading(true);

      await api.post("/admin/send-email", {
        email,
        subject,
        message,
      }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

      alert("Email sent successfully");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.log(err);
      alert("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Send Email to User
      </Typography>

      <Card sx={{ maxWidth: 600, mx: "auto", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            User Email
          </Typography>

          <TextField
            fullWidth
            value={email}
            disabled
            sx={{ mb: 3 }}
          />
        {/* <Typography>{email}</Typography> */}
          <TextField
            label="Subject"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSendEmail}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send Email"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SendEmail;
