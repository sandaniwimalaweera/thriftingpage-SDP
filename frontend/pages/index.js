import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ProductSection from "./auth/products";

export default function LandingPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginRedirect = (path) => {
    handleMenuClose();
    router.push(path);
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ backgroundColor: "#611964" }}>

        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            THRIFT HAVEN
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" onClick={() => { handleMenuClose(); router.push("/"); }}>Home</Button>
            <Button color="inherit" onClick={() => router.push("/products")}>Shop</Button>
            <Button variant="text" color="inherit" onClick={handleMenuOpen}>Login</Button>
            <Button variant="contained" sx={{ ml: 2, backgroundColor: "white", color: "secondary.main" }}>
              Donation
            </Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <MenuItem onClick={() => { handleMenuClose(); router.push("/"); }}>Home</MenuItem>
              <MenuItem onClick={() => router.push("/products")}>Shop</MenuItem>
              <MenuItem onClick={() => handleLoginRedirect("auth/login")}>
                User Login
              </MenuItem>
              <MenuItem onClick={() => handleLoginRedirect("auth/admin-login")}>
                Admin Login
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Donation</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Adding gap between Navbar and Main Content */}
      <Box sx={{ mt: 16 }}></Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" style={{ color: "#611964" }}>
              THRIFT HAVEN
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="textPrimary" mt={2}>
              Cloth Thrifting Platform
            </Typography>
            <Typography variant="h5" color="textSecondary" mt={1}>
              Your new favorite, someone's old treasure
            </Typography>
            <Button
  variant="contained"
  style={{ backgroundColor: "#611964" }}
  sx={{ mt: 3, borderRadius: 2 }}
  onClick={() => router.push('auth/register')}
>
              JOIN WITH US !
            </Button>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Image src="/img2.svg" alt="Thrift Haven" width={600} height={450} />
          </Grid>
        </Grid>
      </Container>

      {/* Adding extra space before Product Section */}
      <Box sx={{ mt: 20}}></Box>

      {/* Product Section */}
      <ProductSection />
    </>
  );
}
