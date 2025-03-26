const express = require("express");
const  router = express.Router();

//Insert Model
const Supplier = require("../Model/SupplierModel");
//Insert Controller
const SupplierController = require("../Controllers/SupplierControllers");

router.get("/",SupplierController.getAllSuppliers);
router.post("/",SupplierController.addsupplier );
router.get("/:id",SupplierController.getById );
router.put("/:id",SupplierController.updatesupplier);
router.delete("/:id",SupplierController.deletesupplier);



//export
module.exports = router;