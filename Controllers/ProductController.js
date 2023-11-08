const Products = require("../models/Product");

module.exports.findProduct = async function (req, res) {
  const data = await Products.findProduct();
  res.json(data);
};

module.exports.AddProduct = async function (req, res) {
  console.log(req.body)
  const data = await Products.AddProduct(req);
  res.json(data);
};

module.exports.DeleteProduct = async function (req, res) {
  const data = await Products.DeleteProduct(req);
  res.json(data);
};

module.exports.UpdateProduct = async function (req, res) {
  const data = await Products.UpdateProduct(req);
  res.json(data);
};




