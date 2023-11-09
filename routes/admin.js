const express = require("express");
const AdminRouter = express.Router();
const CustomerController = require("../Controllers/CustomerController");
const SupplierController = require("../Controllers/SupplierController");
const ProductController = require("../Controllers/ProductController");
const InTransactionController = require("../Controllers/IntransactionController");
const OutTransactionController = require("../Controllers/outtransactionController");
const Reported_Transaction = require("../Controllers/ReportsController");

//* customer API Path *//

// AdminRouter.get("/customer",CustomerController.get)

AdminRouter.get("/customer", CustomerController.findCustomer);
AdminRouter.post("/customer/create", CustomerController.AddCustomer);
AdminRouter.post("/customer/delete/:id", CustomerController.DeleteCustomer);
AdminRouter.patch("/customer/update", CustomerController.UpdateCustomer);
AdminRouter.get("/customer/list", CustomerController.listCustomer);

//* Supplier API Path *//

AdminRouter.get("/supplier", SupplierController.findSupplier);
AdminRouter.post("/supplier/create", SupplierController.AddSupplier);
AdminRouter.delete("/supplier/delete/:id", SupplierController.DeleteSupplier);
AdminRouter.put("/supplier/update", SupplierController.UpdateSupplier);

//* Product API Path *//

AdminRouter.get("/product", ProductController.findProduct);
AdminRouter.post("/product/create", ProductController.AddProduct);
AdminRouter.delete("/product/delete/:id", ProductController.DeleteProduct);
AdminRouter.put("/product/update", ProductController.UpdateProduct);

// Transaction API Path

AdminRouter.post("/in-transaction", InTransactionController.AddInTransaction);
AdminRouter.get(
  "/getallintranscation",
  InTransactionController.GetInTransaction
);
AdminRouter.post(
  "/out-transaction",
  OutTransactionController.AddOutTransaction
);
AdminRouter.get(
  "/getallouttranscation",
  OutTransactionController.GetOutTransaction
);

// Reports API Path //

AdminRouter.get(
  "/get-all-transaction-reports",
  Reported_Transaction.GetReportTransaction
);

module.exports = AdminRouter;
