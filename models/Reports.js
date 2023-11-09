const { data } = require("node-env-file");
const { getAllInTransaction } = require("./In_Trans");
const { getAllOutTransaction } = require("./OutTrans");

module.exports.GetReportAllTransaction = async function (req, res) {
  const inTransactionsData = await getAllInTransaction();
  const outTransactionsData = await getAllOutTransaction();

  const transactionReport = {
    inTransaction: inTransactionsData?.data?.length || 0,
    outTransaction: outTransactionsData?.data?.length || 0,
    totalTransaction:
      inTransactionsData?.data?.length + outTransactionsData?.data?.length || 0,
    inTransactionAmt: 0,
    outTransactionAmt: 0,
    totalTransactionAmt: 0,
    inTransactionQty: 0,
    outTransactionQty: 0,
    totalTransactionQty: 0,
  };

  (inTransactionsData?.data || []).forEach((item) => {
    transactionReport.inTransactionAmt += item.amount;
    transactionReport.totalTransactionAmt += item.amount;
    transactionReport.inTransactionQty += item.qty;
    transactionReport.totalTransactionQty += item.qty;
  });

  (outTransactionsData?.data || []).forEach((item) => {
    transactionReport.outTransactionAmt += item.amount;
    transactionReport.totalTransactionAmt += item.amount;
    transactionReport.outTransactionQty += item.qty;
    transactionReport.totalTransactionQty += item.qty;
  });

  const revenue =
    transactionReport.inTransactionAmt - transactionReport.outTransactionAmt;

  const response = {
    ...transactionReport,
    revenue,
  };

  return response;
};
