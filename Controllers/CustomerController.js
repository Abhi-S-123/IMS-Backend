const Customers = require("../models/Custmer");

module.exports.findCustomer = async function (req, res) {
  const data = await Customers.findCustomer();
  res.json(data);
};

module.exports.AddCustomer = async function (req, res) {
  const data = await Customers.AddCustomer(req);
  res.json(data);
};

module.exports.DeleteCustomer = async function (req, res) {
  const data = await Customers.DeleteCustomer(req);
  res.json(data);
};

module.exports.UpdateCustomer = async function (req, res) {
  const data = await Customers.UpdateCustomer(req);
  res.json(data);
};
module.exports.listCustomer = async function (req, res) {
  const data = await Customers.listCustomer();
  res.json(data);
};





// module.exports.get = async function((req, res) {
//     const data = await Customers.findAll(req);
//     res.json({ success: true, data: data });
//   });
