const express = require("express");
const router = express.Router();
const {
  approveServices,
  analytics,
  getServicesToBeApproved,
  getServiceToBeApproved,
} = require("../controllers/adminController");
const {
  transactionAnalytics,
} = require("./../controllers/analyticsController");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const admin = await User.findOne({ user_id: req._id });
  if (admin.email !== "naruto@gmail.com")
    return res.status(403).json({ message: "not admin! coming out!" });
  next();
};

router.get("/analytics", verifyAdmin, analytics);

router.post("/approve-services", verifyAdmin, approveServices);

router.get(
  "/servicesToBeApproved/:serviceId",
  verifyAdmin,
  getServiceToBeApproved
);

router.get("/servicesToBeApproved/", verifyAdmin, getServicesToBeApproved);

router.get("/transaction-analytics", verifyAdmin, transactionAnalytics);

module.exports = router;
