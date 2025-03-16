const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../middlewares/uploadMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

// Create a Donation with Image Upload
router.post("/donate", verifyToken, upload.single("image"), async (req, res) => {
    try {
        console.log("Request received at /donate");
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const { item_name, description, category, type, size, quantity } = req.body;
        const image = `/public/uploads/${req.file.filename}`;

        if (!item_name || !description || !category || !type || !size || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const query = `INSERT INTO donations (user_id, user_type, item_name, description, category, type, size, quantity, image) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [req.userId, req.userType, item_name, description, category, type, size, quantity, image];

        console.log("SQL Query:", query);
        console.log("Values:", values);

        await db.query(query, values);
        res.status(201).json({ message: "Donation recorded successfully", image: image });
    } catch (err) {
        console.error("Donation Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// Serve Image Files Publicly
router.use("/public/uploads", express.static("public/uploads"));

module.exports = router;
