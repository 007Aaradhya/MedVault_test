require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const medsRoutes = require("./routes/meds");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("MedVault Backend is Running Successfully 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/meds", medsRoutes);
app.use("/api/users", require("./routes/users"));
app.use("/api/alerts", require("./routes/alerts"));

// Port
const PORT = process.env.PORT || 5500;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }); 
