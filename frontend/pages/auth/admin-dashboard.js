// pages/SellerDetail.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "../../components/admin-sidebar.js";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  Modal,
} from "@mui/material";
import {
  AccountCircle,
  Add,
  Logout,
  ShoppingBag,
  Lock,
  ListAlt,
  Redeem,
  Payment,
  Message,
  AssignmentReturn,
  Menu,
  Close,
} from "@mui/icons-material";





const AdminDashboard= () => {
  const [sellers, setSellers] = useState([]);
  const [totalSellers, setTotalSellers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  // Fetch the username and seller data
  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        setSellers(response.data.sellers);
        
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    router.push("/auth/admin-login");
  };

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isSmallScreen ? (
        <>
          <IconButton onClick={() => setOpen(true)} sx={{ position: "absolute", top: 10, left: 10, color: "black" }}>
            <Menu />
          </IconButton>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Sidebar username={username} handleLogout={handleLogout} />
          </Drawer>
        </>
      ) : (
        <Sidebar username={username} handleLogout={handleLogout} />
      )}





 <Container sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
 <Typography variant="h4" fontWeight="bold" color="#611964">
          Welcome, 
  
        </Typography>

       


       
 {/* Details Section */}
 <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">My details</Typography>
                {/* <Typography>{userName}</Typography>
                <Typography>{userEmail}</Typography>
                <Typography>{userContact} </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">Total Sellers</Typography>
                <Typography variant="h4" fontWeight="bold">14</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">Total Buyers</Typography>
                <Typography variant="h4" fontWeight="bold">25</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">Total Donations</Typography>
                <Typography variant="h4" fontWeight="bold">5</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
       



      </Container>
    </Box>
  );
};

export default AdminDashboard;
