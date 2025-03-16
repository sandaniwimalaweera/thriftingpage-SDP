const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header Received:", authHeader); // Debugging line

    if (!authHeader) {
        return res.status(403).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    console.log("Extracted Token:", token); // Debugging line

    if (!token) {
        return res.status(403).json({ error: "Invalid token format" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        next();
    });
};

module.exports = verifyToken;
