const { data } = require("node-env-file");
const Customer = require("./schema/Customer_Schema");
const Validator = require("./Validator/CustomerValidator");
const { customers, statusCodes } = require("./helper/constants");
const Supplier = require("./schema/Supplier_Schema");
const Product = require("./schema/Product_Schema");

module.exports.findCustomer = async function () {
  try {
    const customerData = await Customer.find();
    if (customerData.length > 0) {
      return { data: customerData, message: "found successfully", status: 200 };
    } else {
      return { data: [], message: "data not found", status: 404 };
    }
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

async function isCustomerAlreadyExist(mobile) {
  let exact = { mobile: mobile };
  const data = await Customer.find(exact);
  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports.AddCustomer = async function (req, res) {
  try {
    const userData = req.body;
    const { error } = Validator.customerValidator.validate(userData);
    if (error) {
      return {
        data: error.details,
        message: "something",
        status: 404,
      };
    }
    const CreateData = new Customer(userData);
    await CreateData.save();
    return { data: data, message: "Data saved  successfully", status: 201 };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.DeleteCustomer = async function (req, res) {
  try {
    // const isExist = await isCustomerAlreadyExist(data.mobile);
    // if (isExist == true) {
    //   return { data: [], message: "user already exist", status: 404 };
    // }

    const id = req.params.id;

    const data = await Customer.deleteOne({ _id: id });

    return { data: data, message: "Data Delete successfully", status: 201 };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.UpdateCustomer = async function (req, res) {
  try {
    console.log(req.body.id, "reqId");
    const { _id, ...rest } = req.body;
    const data = await Customer.updateOne({ _id: req.body.id }, rest);
    return { data: data, message: "Data update successfully", status: 201 };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.listCustomer = async function () {
  try {
    const totalCustomers = await Customer.find().count();
    const totalSuppliers = await Supplier.find().count();
    const totalProducts = await Product.find().count();

    const response = {
      totalCustomer: totalCustomers,
      totalSupplier: totalSuppliers,
      totalProducts: totalProducts,
      totalInventory: totalCustomers + totalSuppliers + totalProducts,
    };

    // console.log(users,"....>")
    if (
      response.totalCustomer != null ||
      (undefined && response.totalSupplier != null) ||
      (undefined && response.totalProducts != null) ||
      undefined
    ) {
      return {
        data: response,
        message: customers.FOUND_SUCCESSFULLY,
        status: statusCodes.OK,
      };
    } else {
      return {
        data: [],
        message: customers.NO_CUSTOMER_FOUND,
        status: statusCodes.NOT_FOUND,
      };
    }
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};
