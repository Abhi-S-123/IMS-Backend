const OutTransaction = require("../models/OutTrans");



module.exports.AddOutTransaction = async function (req, res) {
    // console.log(req.body, "<<<<")
    const data = await OutTransaction.AddOutTransaction(req);
    res.json(data);
  };

  module.exports.GetOutTransaction = async function (req, res) {
    const data = await OutTransaction.getAllOutTransaction();
    res.json(data);
  };   