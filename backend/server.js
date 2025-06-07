// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes");
const serviceRoutes = require('./routes/serviceRoutes');
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const connectionString = "mongodb://localhost:27017/Marketing";
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToMongoDB();

// Routes
app.use("/blogs", blogRoutes);
app.use("/services", serviceRoutes);
app.use("/contact", contactRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
