const express = require("express");
const Service = require("../models/Service");
const router = express.Router();

router.get("/:serviceId", async (req, res) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await Service.findById(serviceId).populate("seller_id");
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({
      message: "error",
    });
  }
});

router.get("/", async (req, res) => {
  const servies = await Service.find();

  return res.status(200).json(services);
});

module.exports = router;
