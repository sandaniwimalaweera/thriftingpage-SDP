import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
import { useRouter } from "next/router";


const BuyerDashboard = () => {
  const router = useRouter();

//const [userDetails, setUserDetails] = useState({ name: "", email: "", contact: "" });
  
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const myProductsRef = useRef(null);
  const myDonationsRef = useRef(null);
  const myDetailRef = useRef(null);
const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");
      router.push("/auth/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/details", {
          headers: { Authorization: token },
        });

        if (response.data.userType !== "Buyer") {
          console.log("Not a buyer, redirecting...");
          router.push("/auth/login");
        } else {
          setUserName(response.data.name);
          setUserEmail(response.data.email);
          setUserContact(response.data.contact);
        
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/auth/login");
      }
    };
    

    fetchUserDetails();
  }, [router]);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    router.push("/auth/login");
  };


  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const sidebarContent = (
    <Box sx={{ width: 330, bgcolor: "#611964", color: "white", p: 2, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 80, height: 80, bgcolor: "white", color: "#611964" }}>
          <AccountCircle fontSize="large" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" mt={1}>{userName}</Typography>
      </Box>
      <Box mt={3}>
        {[
          { label: "My details", icon: <AccountCircle /> },
          { label: "Cart", icon: <ShoppingBag />, onClick: () => mymyDetailRef.current. scrollIntoView({ behavior: "smooth" }) },
          { label: "Order Details", icon: <ListAlt /> },
          { label: "Donations", icon: <Redeem />, onClick: () => myDonationsRef.current.scrollIntoView({ behavior: "smooth" }) },
          { label: "Orders", icon: <Payment /> },
          { label: "Change Password", icon: <Lock /> },
          { label: "Messages", icon: <Message /> },
        ].map((item, index) => (
          <Button
            key={index}
            startIcon={item.icon}
            fullWidth
            sx={{ color: "white", justifyContent: "flex-start", my: 1 }}
            onClick={item.onClick}
          >
            {item.label}
          </Button>
        ))}
      </Box>
      <Button startIcon={<Logout />} fullWidth sx={{ color: "white", justifyContent: "flex-start", mt: 3 }} onClick={handleLogout}>
        Log out
      </Button>
    </Box>
  );

  const productCards = [
    { name: "Ladies Shirt", price: 2000, oldPrice: 2400, size: "M", usage: "Not used", img: "/img20.jfif" },
    { name: "Cotton Frock", price: 1450, oldPrice: 1900, size: "L", usage: "One time used", img: "/img21.jfif" },
    { name: "Cotton Top", price: 1300, oldPrice: 1700, size: "M", usage: "One time used", img: "/img22.jfif" },
  ];

  const donationCards = [
    { name: "Ladies Shirt", size: "M", usage: "Not used", img: "/img20.jfif" },
    { name: "Cotton Frock", size: "L", usage: "One time used", img: "/img21.jfif" },
    { name: "Cotton Top", size: "M", usage: "One time used", img: "/img22.jfif" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isSmallScreen ? (
        <>
          <IconButton onClick={() => setOpen(true)} sx={{ position: "absolute", top: 10, left: 10, color: "black" }}>
            <Menu />
          </IconButton>
          <Drawer open={open} onClose={() => setOpen(false)}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, p: 3, overflowY: "auto", height: "100vh" }}>
        <Typography variant="h4" fontWeight="bold" color="#611964">
          Welcome, {userName}!
        </Typography>

        <Box mt={2} display="flex" gap={2}>
    
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push("/auth/donation")}
            sx={{ bgcolor: "#611964", "&:hover": { bgcolor: "#4a124b" } }}
          >
            Add Donations
          </Button>
        </Box>


{/* Details Section */}
<Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" ref={myDetailRef} >My details</Typography>
                <Typography>{userName}</Typography>
                <Typography>{userEmail}</Typography> 
                <Typography>{userContact}</Typography>

              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">Cart Items</Typography>
                <Typography variant="h4" fontWeight="bold"> 14</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">My Orders</Typography>
                <Typography variant="h4" fontWeight="bold">25</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#f7f5f5" }}>
              <CardContent>
                <Typography variant="h6">Returns</Typography>
                <Typography variant="h4" fontWeight="bold">5</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Donation Section */}
        <Typography variant="h5" fontWeight="bold" color="#611964" mt={4} ref={myDonationsRef}>
          Donations
        </Typography>
        <Grid container spacing={2} mt={4}>
          {donationCards.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => handleProductClick(product)} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <CardContent>
                  <Box component="img" src={product.img} alt={product.name} width="100%" height={200} sx={{ objectFit: "cover", borderRadius: 1 }} />
                  <Typography variant="h6" mt={1}>{product.name}</Typography>
                  <Typography variant="h6" color="primary">{product.size}</Typography>
                  <Typography variant="h7" color="primary">{product.usage}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pop-up Modal for Full Image */}
      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 24, width: "90%", maxWidth: 600, position: "relative" }}>
          {selectedProduct && (
            <>
              <IconButton onClick={() => setSelectedProduct(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
                <Close />
              </IconButton>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" fontWeight="bold" mt={2}>{selectedProduct.name}</Typography>
                <Box component="img" src={selectedProduct.img} alt={selectedProduct.name} width="100%" maxHeight={500} sx={{ objectFit: "contain", mt: 2 }} />
                <Typography variant="body1" textAlign="center" mt={2}>{selectedProduct.usage}</Typography>
                <Typography variant="h6" color="primary" mt={1}>Size : {selectedProduct.size}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BuyerDashboard;
