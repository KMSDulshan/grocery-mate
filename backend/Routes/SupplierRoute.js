const express = require("express");
const  router = express.Router();

//Insert Model
const Supplier = require("../Model/SupplierModel");
//Insert Controller
const SupplierController = require("../Controlers/SupplierControle");

router.get("/",SupplierController.getAllSuppliers);
router.post("/",SupplierController.addsupplier );
router.get("/:id",SupplierController.getById );
//export
module.exports = router;