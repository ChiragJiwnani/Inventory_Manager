// inventoryController.js
const Inventory = require("../models/Inventory");

exports.getAllItems = async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
};

exports.addItem = async (req, res) => {
  const item = new Inventory(req.body);
  await item.save();
  res.json({ message: "Item added" });
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { user, ...rest } = req.body;

  await Inventory.findByIdAndUpdate(id, {
    currentHolder: user,
    ...rest
  });

  res.json({ message: "Item updated" });
};


exports.passItem = async (req, res) => {
  const { id } = req.params;
  const { newUser, newEmployeeCode } = req.body;

  const item = await Inventory.findById(id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.history.push({
    user: item.currentHolder,
    employeeCode: item.employeeCode,
    date: new Date()
  });

  item.currentHolder = newUser;
  item.user = newUser;
  item.employeeCode = newEmployeeCode;

  await item.save();
  res.json({ message: "Item passed on" });
};
