import React, { useState, useEffect } from "react";
import { 
    Box, Container, Typography, TextField, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import Sidebar from "../../components/admin-sidebar.js";

const BuyerDetail = () => {
    const [buyers, setBuyers] = useState([]);
    const [search, setSearch] = useState("");
    const [editBuyer, setEditBuyer] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [totalBuyers, setTotalBuyers] = useState(0);

    // Fetch buyers and count on component load
    useEffect(() => {
        fetchBuyers();
        fetchTotalBuyers();
    }, []);

    // Fetch total buyers count
    const fetchTotalBuyers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/buyers/count");
            setTotalBuyers(response.data.totalBuyers);
        } catch (error) {
            console.error("Error fetching total buyers:", error);
        }
    };

    // Search with debounce
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchBuyers();
        }, 500);
        return () => clearTimeout(delaySearch);
    }, [search]);

    const fetchBuyers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`http://localhost:5000/api/buyers?name=${search}`);
            setBuyers(response.data);
        } catch (err) {
            setError("Error fetching buyers. Please try again later.");
            console.error("Error fetching buyers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this buyer?")) {
            setLoading(true);
            setError("");
            try {
                await axios.delete(`http://localhost:5000/api/buyers/${id}`);
                setBuyers(buyers.filter(buyer => buyer.id !== id));
            } catch (err) {
                setError("Error deleting buyer. Please try again later.");
                console.error("Error deleting buyer:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditClick = (buyer) => {
        setEditBuyer(buyer);
        setIsEditDialogOpen(true);
    };

    const handleEditChange = (e) => {
        setEditBuyer({ ...editBuyer, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!editBuyer || !editBuyer.name || !editBuyer.email || !editBuyer.contact) {
            setError("All fields are required.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await axios.put(`http://localhost:5000/api/buyers/${editBuyer.id}`, editBuyer);
            setBuyers(buyers.map((buyer) => (buyer.id === editBuyer.id ? editBuyer : buyer)));
            setIsEditDialogOpen(false);
        } catch (err) {
            setError("Error updating buyer. Please try again later.");
            console.error("Error updating buyer:", err);
        } finally {
            setLoading(false);
        }
    };





    return (
      <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, color: '#611964' }}> Buyer Details</Typography>

{/* Display total buyer count */}
<div className="mb-4">
  <p className="text-lg font-semibold">Total Buyers: {totalBuyers}</p>
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


                {/* Buyer Details Table */}
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
                            ) : buyers.length > 0 ? (
                                buyers.map((buyer) => (
                                    <TableRow key={buyer.id}>
                                        <TableCell>{buyer.id}</TableCell>
                                        <TableCell>{buyer.name}</TableCell>
                                        <TableCell>{buyer.email}</TableCell>
                                        <TableCell>{buyer.contact}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEditClick(buyer)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(buyer.id)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No buyers found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Edit Seller Dialog */}
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                <DialogTitle>Edit Buyer</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={editBuyer?.name || ""}
                        onChange={handleEditChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editBuyer?.email || ""}
                        onChange={handleEditChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Contact"
                        name="contact"
                        value={editBuyer?.contact || ""}
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

export default BuyerDetail;






           