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
console.log("AUTH ROUTES LOADED");
app.use("/auth", authRoutes);

console.log("USER ROUTES LOADED");
app.use("/users", userRoutes);

console.log("RECORD ROUTES LOADED");
app.use("/records", recordRoutes);

console.log("DASHBOARD ROUTES LOADED");
app.use("/dashboard", recordRoutes);

module.exports = app;