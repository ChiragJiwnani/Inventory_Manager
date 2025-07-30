// Inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    user: String,
    employeeCode: String,
    department: String,
    designation: String,
    assetCode: String,
    category: String,
    itemBrand: String,
    itemSpecification: String,
    modelNo: String,
    serialNo: String,
    purchaseDate: Date,
    currentHolder: String,
    history: [
        {
            user: String,
            employeeCode: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("Inventory", inventorySchema);
