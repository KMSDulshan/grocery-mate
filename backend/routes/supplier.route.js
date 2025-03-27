const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplier.controller");

// Define supplier routes
router.get("/", SupplierController.getAllSuppliers);
router.post("/", SupplierController.createSupplier);
router.get("/:id", SupplierController.getById);
router.put("/:id", SupplierController.updatesupplier);
router.delete("/:id", SupplierController.deletesupplier);

// Export router
module.exports = router;