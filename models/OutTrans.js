const { data } = require("node-env-file");
const Out_Transaction = require("../models/schema/Out_Transaction");
const Product = require("../models/Product");

module.exports.AddOutTransaction = async function (req, res) {
  const outTransactionData = {
    customer_id: req.body.customer_id,
    product_id: req.body.product_id,
    qty: req.body.qty,
    date: new Date(),
  };
  const availableQty = await Product.GetProductData(
    outTransactionData.product_id
  );
  if (availableQty.data < outTransactionData.qty) {
    return {
      data: [],
      message: "Insufficient Quantity",
      status: 404,
    };
  }
  const dataToSave = Out_Transaction(outTransactionData);
  const response = await dataToSave.save();
  if (response) {
    await Product.UpdateProductQuantity(
      outTransactionData.product_id,
      outTransactionData.qty
    );
  }
  return { data: response, message: "Data Saved successfully", status: 500 };
};

module.exports.getAllOutTransaction = async function (req, res) {
  const project = {
    _id: "$_id",
    qty: "$qty",
    date: "$date",
    customer_id: "$customer_id",
    product_id: "$product_id",
    product_name: "$_product.product_name",
    customer_name: "$_customer.name",
    margin: "$_product.margin",
    product_price: "$_product.price"
  };

  const transactionData = await Out_Transaction.aggregate([
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
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "_customer",
      },
    },
    {
      $unwind: { path: "$_customer", preserveNullAndEmptyArrays: true },
    },
    { $project: project },
    { $sort: { _id: -1 } },
  ]);
  let updatedResponse = transactionData.map((item) => {
    return {
      _id: item._id,
      product_id: item.product_id,
      customer_id: item.customer_id,
      qty: item.qty,
      product_name: item.product_name,
      customer_name: item.customer_name,
      date: item.date,
      amount: (item.qty * item.product_price * (100 + item.margin)) / 100
    };
  });
  return {
    data: updatedResponse,
    message: "Data Saved successfully",
    status: 200,
  };
};
