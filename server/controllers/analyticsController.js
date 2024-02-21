const User = require("../models/User");
const Seller = require("../models/Seller");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const Service = require("../models/Service");

//* Which user bought which service from which freelancer
//* Number of registrations
//* monthly Report of orders

// const paymentDocs = await Payment.find();

// let sellerDocs = paymentDocs.map((payment) =>
//   Seller.findOne({ seller_id: payment.seller_id }).select("-certificates")
// );
// sellerDocs = await Promise.all(sellerDocs);

// let userDocs = paymentDocs.map((payment) =>
//   User.findOne({ user_id: payment.user_id }).select("-user_img")
// );
// userDocs = await Promise.all(userDocs);

function extractMonthYear(dateString) {
  let date = new Date(dateString);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let formattedDate = `${year}-${month}`;
  return formattedDate;
}

const yearWiseAnalytics = (data) => {
  const mpp = new Map();
  data.forEach((doc) => {
    const formattedDate = extractMonthYear(doc.order_date);
    if (mpp.has(formattedDate)) {
      mpp.set(formattedDate, mpp.get(formattedDate) + doc.grand_total);
    } else {
      mpp.set(formattedDate, doc.grand_total);
    }
  });
  const yearMonth = [];
  const moneySpent = [];
  mpp.forEach((val, key) => {
    yearMonth.push(key);
    moneySpent.push(val);
  });
  return { years: yearMonth, money: moneySpent };
};

const transactionAnalytics = async (req, res, next) => {
  try {
    console.log("bro");
    const orders = await Order.find().sort("order_date");
    const plotResult = yearWiseAnalytics(orders);
    console.log(plotResult);
    res.json({
      plot: plotResult,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Error occurred",
    });
  }
};
module.exports = { transactionAnalytics };
