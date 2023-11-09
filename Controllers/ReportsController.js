const Reports_Transaction = require("../models/Reports");

module.exports.GetReportTransaction = async function (req, res) {
  const data = await Reports_Transaction.GetReportAllTransaction();
  res.json(data);
};
