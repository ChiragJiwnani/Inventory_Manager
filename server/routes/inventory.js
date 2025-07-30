// server/routes/inventory.js
const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();
const {
  getAllItems,
  addItem,
  updateItem,
  passItem
} = require("../controllers/inventoryController");
const authMiddleware = require('../middleware/auth');

router.get("/", authMiddleware, getAllItems);
router.post("/", authMiddleware, addItem);
router.put("/:id", authMiddleware, updateItem);
router.post("/passon/:id", authMiddleware, passItem);

router.post("/bulk", async (req, res) => {
    try {
        const inventories = req.body.map(item => ({
            ...item,
            currentHolder: item.currentHolder || item.user, // fallback
            history: [{
                user: item.currentHolder || item.user,
                employeeCode: item.employeeCode,
                date: new Date()
            }]
        }));

        await Inventory.insertMany(inventories);
        res.status(201).json({ message: "Bulk inventory added" });
    } catch (err) {
        console.error("Bulk insert error:", err);
        res.status(500).json({ error: "Failed to add bulk inventory" });
    }
});

router.get('/all', authMiddleware, async (req, res) => {
  const data = await Inventory.find();
  res.json(data);
});


module.exports = router;
