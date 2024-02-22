const express = require("express");
const Service = require("../models/Service");
const router = express.Router();

router.get('/toBeApproved', async (req, res) => {
  try {
    console.log('inside');
    const data = await Service.find({ isAdminApproved: false });
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})

router.post('/approve/:id', async (req, res) => {
  try {
    const data = await Service.findOne({ _id: req.params.id, isAdminApproved: false });

    console.log(data);

    data.isAdminApproved = true;

    await data.save();
    console.log(data);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})

router.post('/reject/:id', async (req, res) => {
  try {
    const data = await Service.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Deleted Successfully!' });
  } catch (err) {
    console.log(err);
  }
})

router.get("/:serviceId", async (req, res) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await Service.findOne({ _id: serviceId, isAdminApproved: true }).populate("seller_id");
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({
      message: "error",
    });
  }
});

router.get("/", async (req, res) => {
  const services = await Service.find();

  return res.status(200).json(services);
});

module.exports = router;
