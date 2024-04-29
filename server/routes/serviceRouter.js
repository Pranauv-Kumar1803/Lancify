const express = require("express");
const Service = require("../models/Service");
const router = express.Router();
const client = require("../helpers/redis");

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
    client.get(serviceId, async (err, cache_data) => {
      console.log(err); 
      if (cache_data) {
        return res.status(200).json({
          message: `Retrieved ${serviceId}'s data from the cache`,
          service: JSON.parse(cache_data)
        })
      } else {
        const service = await Service.findOne({ _id: serviceId, isAdminApproved: true }).populate("seller_id");
        client.setEx(serviceId, 1440, JSON.stringify(service))
        return res.status(200).json({
          message: `Retrieved ${serviceId}'s data from the server`,
          service
        })
      }
    })
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
