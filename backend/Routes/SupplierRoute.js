const express = require("express");
const router = express.Router();
const SupplierController = require("../Controllers/SupplierControllers");

// Define supplier routes
router.get("/", SupplierController.getAllSuppliers);
router.post("/", SupplierController.addsupplier);
router.get("/:id", SupplierController.getById);
router.put("/:id", SupplierController.updatesupplier);
router.delete("/:id", SupplierController.deletesupplier);

// Export router
module.exports = router;