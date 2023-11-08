const { data } = require("node-env-file");
const In_Transaction = require("../models/schema/In_Transaction");
const Product = require("../models/Product");

module.exports.AddInTransaction = async function (req, res) {
  const inTransactionData = {
    supplier_id: req.body.supplier_id,
    product_id: req.body.product_id,
    qty: req.body.qty,
    date: new Date(),
  };

  const dataToSave = In_Transaction(inTransactionData);
  const response = await dataToSave.save();
  if (response) {
    await Product.UpdateProductQty(
      inTransactionData.product_id,
      inTransactionData.qty
    );
  }

  return { data: response, message: "Data Saved successfully", status: 200 };
};

module.exports.getAllInTransaction = async function (req, res) {
  const project = {
    _id: "$_id",
    qty: "$qty",
    date: "$date",
    supplier_id: "$supplier_id",
    product_id: "$product_id",
    product_name: "$_product.product_name",
    company_name: "$_supplier.company_name",
    margin: "$_product.margin",
    product_price: "$_product.price",
  };
  let transactionData = await In_Transaction.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "_product",
      },
    },
    { $unwind: { path: "$_product", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier_id",
        foreignField: "_id",
        as: "_supplier",
      },
    },
    { $unwind: { path: "$_supplier", preserveNullAndEmptyArrays: true } },
    { $project: project },
    { $sort: { _id: -1 } },
  ]);
  let updatedResponse = transactionData.map((item) => {
    return {
      _id: item._id,
      product_id: item.product_id,
      supplier_id: item.supplier_id,
      qty: item.qty,
      product_name: item.product_name,
      company_name: item.company_name,
      date: item.date,
      amount: item.qty * item.product_price,
    };
  });
  return {
    data: updatedResponse,
    message: "Data Saved successfully",
    status: 200,
  };
};
