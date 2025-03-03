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
    res.status(403).json({ error: "Access denied. Only sellers can add products." });
  }
};

// Add Product Route (Only for Sellers)
router.post("/add", verifySeller, upload.single("image"), (req, res) => {
  const {
    productName,
    description,
    category,
    type,
    size,
    status,
    quantity,
    originalPrice,
    price,
  } = req.body;
  const seller_id = req.user.id; // Assuming user is authenticated and stored in req.user
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO products (seller_id, product_name, description, category, type, size, status, quantity, image, original_price, price) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [seller_id, productName, description, category, type, size, status, quantity, image, originalPrice, price],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Product added successfully", productId: result.insertId });
    }
  );
});

module.exports = router;
