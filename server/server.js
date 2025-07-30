// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const inventoryRoutes = require("./routes/inventory");
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/inventoryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/inventory", inventoryRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
