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
  orderAnalytics,
} = require("./../controllers/analyticsController");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const admin = await User.findOne({ user_id: req._id });
  if (admin.email !== "naruto@gmail.com")
    return res.status(403).json({ message: "not admin! coming out!" });
  next();
};


/**
 * @swagger
 * /admin/services-to-be-approved:
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
 *                 $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Services not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
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

router.get(
  "/servicesToBeApproved/:serviceId",
  verifyAdmin,
  getServiceToBeApproved
);



/**
 * @swagger
 * /admin/analytics:
 *   get:
 *     summary: Retrieve analytics data
 *     description: Retrieves analytics data including sellers, services, users, orders, ratings, and average seller rating.
 *     tags:
 *       - Analytics
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sellers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                 ratings:
 *                   type: array
 *                   items:
 *                     type: object
 *                 averageRating:
 *                   type: number
 *                   description: Average rating of sellers
 */
router.get("/analytics", verifyAdmin, analytics);


/**
 * @swagger
 * /admin/approve-services:
 *   post:
 *     summary: Approve services
 *     description: Approves services by updating the `isAdminApproved` field to true.
 *     tags:
 *       - Services
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of service IDs to be approved
 *     responses:
 *       '200':
 *         description: Successfully approved services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
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

router.post("/approve-services", verifyAdmin, approveServices);

/**
 * @swagger
 * /admin/servicesToBeApproved/{serviceId}:
 *   get:
 *     summary: Get a service to be approved by ID
 *     description: Retrieves a service that is pending approval by the admin using its ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service to be approved
 *     responses:
 *       '200':
 *         description: Successful response with service data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
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

router.get("/servicesToBeApproved/", verifyAdmin, getServicesToBeApproved);

/**
 * @swagger
 * /admin/transaction-analytics:
 *   get:
 *     summary: Get transaction analytics
 *     description: Retrieves analytics data related to transactions.
 *     tags:
 *       - Analytics
 *     responses:
 *       '200':
 *         description: Successful response with transaction analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define your response properties here
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
router.get("/transaction-analytics", verifyAdmin, transactionAnalytics);


/**
 * @swagger
 * /admin/order-analytics:
 *   get:
 *     summary: Get order analytics
 *     description: Retrieves analytics data related to orders.
 *     tags:
 *       - Analytics
 *     responses:
 *       '200':
 *         description: Successful response with order analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define your response properties here
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
router.get("/order-analytics", verifyAdmin, orderAnalytics);

module.exports = router;
