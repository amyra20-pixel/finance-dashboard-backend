const express = require("express");
const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Mount routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);


module.exports = app;