const express = require('express');
const AdminRouter = express.Router();
const CustomerController = require("../Controllers/CustomerController")
const SupplierController = require("../Controllers/SupplierController")
const ProductController = require("../Controllers/ProductController")
const InTransactionController = require('../Controllers/IntransactionController')
const OutTransactionController = require('../Controllers/outtransactionController')


//* customer API Path *//

// AdminRouter.get("/customer",CustomerController.get)

AdminRouter.get("/customer",CustomerController.findCustomer)
AdminRouter.post("/customer/create",CustomerController.AddCustomer)
AdminRouter.post("/customer/delete/:id", CustomerController.DeleteCustomer)
AdminRouter.patch("/customer/update", CustomerController.UpdateCustomer)
AdminRouter.get("/customer/list", CustomerController.listCustomer)

//* Supplier API Path *//

AdminRouter.get("/supplier",SupplierController.findSupplier)
AdminRouter.post("/supplier/create",SupplierController.AddSupplier)
AdminRouter.delete("/supplier/delete/:id", SupplierController.DeleteSupplier)
AdminRouter.put("/supplier/update", SupplierController.UpdateSupplier)


//* Product API Path *//

AdminRouter.get("/product", ProductController.findProduct)
AdminRouter.post("/product/create", ProductController.AddProduct)
AdminRouter.delete("/product/delete/:id",  ProductController.DeleteProduct)
AdminRouter.put("/product/update", ProductController.UpdateProduct) 




// Transaction API Path 

AdminRouter.post("/in-transaction", InTransactionController.AddInTransaction)
AdminRouter.get("/getallintranscation", InTransactionController.GetInTransaction)
AdminRouter.post("/out-transaction", OutTransactionController.AddOutTransaction)
AdminRouter.get("/getallouttranscation", OutTransactionController.GetOutTransaction)






module.exports = AdminRouter




// app.

//   app.post("/customer/create", async (req, res) => {
//     console.log(req.body);
//     const data = new Customers(req.body);
//     await data.save();
//     res.send({ success: true, message: "Data Save Successfully" });
//   });

//   app.put("/customer/update", async (req, res) => {
//     const { _id, ...rest } = req.body;
//     console.log(rest)
//     const data = await Customers.updateOne({ _id: req.body.id }, rest);
//     res.json({ success: true, message: "Data Update Successfully", data: data });
//   });

//   app.delete("/customer/delete/:id", async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const data = await Customers.deleteOne({ _id: id });
//     res.send({ success: true, message: "Data Deleted Successfully", data: data });
//   });