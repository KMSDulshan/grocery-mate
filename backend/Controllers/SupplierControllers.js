const Supplier = require("../Model/SupplierModel");

const getAllSuppliers = async (req, res) => {

    //get all suppliers
    let Suppliers;

    try{
        Suppliers = await Supplier.find();
    }catch(err){
        console.log(err);

    }
    //not found
    if(!Suppliers){
        return res.status(404).json({message:"user not found"})
    }
    //display all users
    return res.status(200).json({Suppliers});
};

const addsupplier = async (req, res) => {

    const {name, email, phone, address, status, products, orders, revenue } = req.body;
     
    let suppliers;
    try {
        suppliers = new Supplier({name, email, phone, address, status, products, orders, revenue});
        await suppliers.save();

    }catch (err){
        console.log(err);
    }
    if(!suppliers){
        return res.status(404).json({message:"unable not found"});
    }
    return res.status(200).json({suppliers});
};

exports.getAllSuppliers = getAllSuppliers;
exports.addsupplier  = addsupplier ;

//get by id
const getById = async (req, res,next) => {
    const id = req.params.id;

    let supplier;
    try{
  supplier = await Supplier.findById(id);

    }catch (err){
        console.log(err);
    }
    // not avilable users
    if(!supplier){
        return res.status(404).json({message:"Supplier not found"});
    }
return res.status(200).json({supplier});

}
const updatesupplier = async (req, res) => {
    const id = req.params.id;
    const {  name,  email,  phone, address,  status, products, orders, revenue } = 
    req.body;
  
    let supplier;
  
    try {
      // Update the supplier with the provided data
      supplier = await Supplier.findByIdAndUpdate(
        id,
        { name, email, phone, address, status, products, orders, revenue },
        { new: true } // Return the updated document
      );
    } catch (err) {
      console.log(err); // Log any errors
    }
  
    // If no supplier is found or updated
    if (!supplier) {
      return res.status(404).json({ message: "Unable to update supplier" });
    }
  
    // Return the updated supplier with a 200 status
    return res.status(200).json({ supplier });
  };

 //delete supplier ditails
  const deletesupplier = async (req, res, next) => {
    const id = req.params.id;

    let supplier;
    try {
    supplier =await Supplier.findByIdAndDelete(id);
    }catch (err){
    console.log(err);
    }
    
    if (!supplier){
        return res.status(404).json({ message: "Unable to Delete supplier" });
    }
  
    // Return the deleted supplier with a 200 status
    return res.status(200).json({ supplier });
  };

exports.getAllSuppliers = getAllSuppliers;
exports.addsupplier = addsupplier;
exports.getById = getById;
exports.updatesupplier = updatesupplier;
exports.deletesupplier = deletesupplier;
