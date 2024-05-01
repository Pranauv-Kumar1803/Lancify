const express = require("express");
const Service = require("../models/Service");
const router = express.Router();
const client = require("../helpers/redis");

 
/**
 * @swagger
 * /services/toBeApproved:
 *   get:
 *     summary: Get services to be approved
 *     description: Retrieves services that are pending approval by the admin.
 *     tags:
 *       - Services
 *     responses:
 *       '200':
 *         description: Successful response with services data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
  
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
  // redis
  const serviceId = req.params.serviceId;
  try {
    client.get(serviceId, async (err, cache_data) => {
      if(err) console.log(err); 
      if (cache_data) {
        return res.status(200).json({
          message: `Retrieved ${serviceId}'s data from the cache`,
          service: JSON.parse(cache_data)
        })
      } else {
        const service = await Service.findOne({ _id: serviceId, isAdminApproved: true }).populate("seller_id");
        client.set(serviceId, JSON.stringify(service), "EX", 1000)
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
