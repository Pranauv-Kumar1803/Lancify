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

/**
 * @swagger
 * /admin/services-to:
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


router.get("/analytics", verifyAdmin, analytics);

router.post("/approve-services", verifyAdmin, approveServices);

router.get(
  "/servicesToBeApproved/:serviceId",
  verifyAdmin,
  getServiceToBeApproved
);

router.get("/servicesToBeApproved/", verifyAdmin, getServicesToBeApproved);

router.get("/transaction-analytics", verifyAdmin, transactionAnalytics);

router.get("/order-analytics", verifyAdmin, orderAnalytics);

module.exports = router;
