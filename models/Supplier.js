const { data } = require("node-env-file");
const Supplier = require("../models/schema/Supplier_Schema");
const Validator = require("./Validator/SupplierValidator");

module.exports.findSupplier = async function () {
  try {
    const supplierData = await Supplier.find();
    if (supplierData.length > 0) {
      return { data: supplierData, message: "found successfully", status: 200 };
    } else {
      return { data: [], message: "data not found", status: 404 };
    }
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.AddSupplier = async function (req, res) {
  try {
    const { error } = Validator.SupplierValidator.validate(req.body);
    if (error) {
      return {
        data: error.details,
        message: "something",
        status: 404,
      };
    }
    const CreateData = new Supplier(req.body);
    await CreateData.save();
    return { data: data, message: "Data saved  successfully", status: 201 };
  } catch (error) {
    console.log(error);
    return { data: [], message: "Internal server error", status: 500 };
  }
};

module.exports.DeleteSupplier = async function (req, res) {
  try {
    const id = req.params.id;

    const DeleteData = await Supplier.deleteOne({ _id: id });

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

module.exports.UpdateSupplier = async function (req, res) {
  try {
    const { _id, ...rest } = req.body;
    const UpdateData = await Supplier.updateOne({ _id: req.body.id }, rest);
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



