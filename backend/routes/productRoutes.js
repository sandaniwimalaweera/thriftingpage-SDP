const express = require("express");
const multer = require("multer");
const db = require("../db");

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware to check if user is a seller
const verifySeller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    return res.status(403).json({ error: "Access denied. Only sellers can add products." });
  }
};

// Add Product Route (Only for Sellers)
router.post("/add", verifySeller, upload.single("image"), (req, res) => {
  console.log("Request body:", req.body);
  const {
    product_name, // Ensure consistency in variable naming
    description,
    category,
    type,
    size,
    status,
    quantity,
    original_price,
    price,
  } = req.body;
  
   // Check for missing fields
   if (!product_name || !description || !category || !type || !size || !status || !quantity || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const seller_id = req.user.id;  // Assuming the user is authenticated
  const image = req.file ? `/uploads/${req.file.filename}` : null;



  // Check if the seller exists in the database
  const checkSellerQuery = "SELECT * FROM users WHERE id = ?";
  db.query(checkSellerQuery, [seller_id], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: "Seller not found" });
    }
    const sql = `INSERT INTO products (seller_id, product_name, description, category, type, size, status, quantity, image, original_price, price) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [seller_id, product_name, description, category, type, size, status, quantity, image, original_price, price],
      (err, result) => {
        if (err) {
          console.error("Database error: ", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Product added successfully", productId: result.insertId });
      }
    );
  });
});

module.exports = router;
