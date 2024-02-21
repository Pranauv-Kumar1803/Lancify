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

const yearWiseAnalytics = (data) => {};

const transactionAnalytics = async (req, res, next) => {
  try {
    console.log("bro");
    const orders = await Order.find();
    console.log(orders);

    res.json({
      ok: "ok",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Error occurred",
    });
  }
};
module.exports = { transactionAnalytics };
