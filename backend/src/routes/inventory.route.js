const express = require("express")
const router = express.Router();
const InventoryController = require("../controllers/inventory.controller");

router.get("/", InventoryController.getAllInventory);
router.post("/", InventoryController.addInventory);
router.get("/:id", InventoryController.getById);
router.put("/:id", InventoryController.updateInventory);
router.delete("/:id", InventoryController.deleteInventory);

module.exports = router;

