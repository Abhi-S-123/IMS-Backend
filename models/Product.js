const { data } = require("node-env-file");
const Product = require("../models/schema/Product_Schema");
const Validator = require("./Validator/ProductValidator");

module.exports.findProduct = async function () {
  try {
    const productData = await Product.find();
    if (productData.length > 0) {
      return { data: productData, message: "found successfully", status: 200 };
    } else {
      return { data: [], message: "data not found", status: 404 };
    }
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.AddProduct = async function (req, res) {
  try {
    // const { error } = Validator.ProductValidator.validate(req.body);
    // if (error) {
    //   return {
    //     data: error.details,
    //     message: "something",
    //     status: 404,
    //   };

    const dataToSave = {
      product_name: req.body.product_name,
      price: req.body.price,
      description: req.body.description,
      uom: req.body.uom,
      quantity: req.body.quantity,
      // margin: req.body.margin,
    };
    const CreateData = new Product(dataToSave);
    await CreateData.save();
    return { data: data, message: "Data saved  successfully", status: 201 };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.DeleteProduct = async function (req, res) {
  try {
    const id = req.params.id;

    const DeleteData = await Product.deleteOne({ _id: id });

    return {
      data: DeleteData,
      message: "Data Delete successfully",
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.UpdateProduct = async function (req, res) {
  try {
    const { _id, ...rest } = req.body;
    const UpdateData = await Product.updateOne({ _id: req.body.id }, rest);
    return {
      data: UpdateData,
      message: "Data update successfully",
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.UpdateProductQty = async function (id, qty) {
 
  const updatedData = await Product.updateOne({ _id: id },{ $inc: { quantity: qty } });
  
};

module.exports.UpdateProductQuantity = async function(id,qty){
const updateLessData = await Product.updateOne({_id:id},{ $inc: { quantity: -qty } })

}

module.exports.GetProductData = async function(id){
  const data = await Product.findOne({_id:id})
  
  return{
    data: data.quantity
  };
}