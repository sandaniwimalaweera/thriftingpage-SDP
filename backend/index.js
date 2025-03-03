const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const db = require("./db");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend to communicate with the backend
  methods: ["GET", "POST"],
  credentials: true  // Ensure cookies or sessions are passed along
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static("public/uploads")); // Serve images

// Mock Authentication Middleware (Replace with actual authentication logic)
app.use((req, res, next) => {
  req.user = { id: 1, role: "seller" }; // Replace with actual user authentication
  next();
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// User Registration Route
app.post("/api/users/register", async (req, res) => {
  const { name, email, contact, password, userType } = req.body;

  // Check if all fields are provided
  if (!name || !email || !contact || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const insertQuery = "INSERT INTO users (name, email, contact, password, userType) VALUES (?, ?, ?, ?, ?)";
      db.query(insertQuery, [name, email, contact, hashedPassword, userType], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Database insertion error" });
        }
        res.status(201).json({ message: "User registered successfully!" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// User Login Route
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result[0];

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token with expiration time of 1 hour
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token, userType, and a success message
    res.status(200).json({
      message: "Login successful",
      token,
      userType: user.userType, // Send the userType in the response
    });
  });
});

// Protected Route Middleware (Optional example)
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  });
};

// Sample Protected Route (For testing purposes)
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: "This is a protected route",
    userId: req.userId,
    userType: req.userType,
  });
});

// Get User Details Route
app.get("/api/users/details", verifyToken, (req, res) => {
  const query = "SELECT name, userType FROM users WHERE id = ?";
  
  db.query(query, [req.userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json(result[0]);
  });
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
