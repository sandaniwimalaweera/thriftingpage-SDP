import React, { useState, useEffect } from "react";
import { 
    Box, Container, Typography, TextField, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import Sidebar from "../../components/admin-sidebar.js";

const SellerDetail = () => {
    const [sellers, setSellers] = useState([]);
    const [search, setSearch] = useState("");
    const [editSeller, setEditSeller] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
     const [totalSellers, setTotalSellers] = useState(0);


    // Fetch sellers and count on component load
  useEffect(() => {
    fetchSellers();
    fetchTotalSellers();
  }, []);

 // Fetch total sellers count
 const fetchTotalSellers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sellers/count");
      setTotalSellers(response.data.totalSellers);
    } catch (error) {
      console.error("Error fetching total sellers:", error);
    }
  };






    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchSellers();
        }, 500); // Debounce search to reduce API calls
        return () => clearTimeout(delaySearch);
    }, [search]);

    const fetchSellers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`http://localhost:5000/api/sellers?name=${search}`);
            setSellers(response.data);
        } catch (err) {
            setError("Error fetching sellers. Please try again later.");
            console.error("Error fetching sellers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this seller?")) {
            setLoading(true);
            setError("");
            try {
                await axios.delete(`http://localhost:5000/api/sellers/${id}`);
                setSellers(sellers.filter(seller => seller.id !== id)); // Update UI without re-fetching
            } catch (err) {
                setError("Error deleting seller. Please try again later.");
                console.error("Error deleting seller:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditClick = (seller) => {
        setEditSeller(seller);
        setIsEditDialogOpen(true);
    };

    const handleEditChange = (e) => {
        setEditSeller({ ...editSeller, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!editSeller || !editSeller.name || !editSeller.email || !editSeller.contact) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axios.put(`http://localhost:5000/api/sellers/${editSeller.id}`, editSeller);
            setSellers(sellers.map(s => (s.id === editSeller.id ? editSeller : s))); // Update UI without re-fetching
            setIsEditDialogOpen(false);
        } catch (err) {
            setError("Error updating seller. Please try again later.");
            console.error("Error updating seller:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Container sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, color: '#611964' }}> Seller Details</Typography>


   {/* Display total sellers count */}
   <div className="mb-4">
        <p className="text-lg font-semibold">Total Sellers: {totalSellers}</p>
      </div>

                {/* Search Bar */}
                <TextField
                    label="Search by name"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 3 }}
                />

                {/* Error message */}
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                {/* Seller Details Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#611964" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : sellers.length > 0 ? (
                                sellers.map((seller) => (
                                    <TableRow key={seller.id}>
                                        <TableCell>{seller.id}</TableCell>
                                        <TableCell>{seller.name}</TableCell>
                                        <TableCell>{seller.email}</TableCell>
                                        <TableCell>{seller.contact}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEditClick(seller)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(seller.id)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No sellers found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Edit Seller Dialog */}
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                <DialogTitle>Edit Seller</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={editSeller?.name || ""}
                        onChange={handleEditChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editSeller?.email || ""}
                        onChange={handleEditChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Contact"
                        name="contact"
                        value={editSeller?.contact || ""}
                        onChange={handleEditChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" disabled={loading}>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SellerDetail;
