const InTransaction = require("../models/In_Trans");

module.exports.AddInTransaction = async function (req, res) {
    // console.log(req.body, "<<<<")
    const data = await InTransaction.AddInTransaction(req);
    res.json(data);
  };
  
module.exports.GetInTransaction = async function (req, res) {
    const data = await InTransaction.getAllInTransaction();
    res.json(data);
  }; 
  
