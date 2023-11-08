const Suppliers = require("../models/Supplier");

module.exports.findSupplier = async function (req, res) {
  const data = await Suppliers.findSupplier();
  res.json(data);
};

module.exports.AddSupplier = async function (req, res) {
  const data = await Suppliers.AddSupplier(req);
  res.json(data);
};

module.exports.DeleteSupplier = async function (req, res) {
  const data = await Suppliers.DeleteSupplier(req);
  res.json(data);
};

module.exports.UpdateSupplier = async function (req, res) {
  const data = await Suppliers.UpdateSupplier(req);
  res.json(data);
};




