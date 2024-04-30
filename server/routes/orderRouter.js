const express = require('express');
const { acceptOrderAndClose, addToOrderTimeline, addToTimelineDone, getOrder, rateOrder, sellerCancelOrder } = require('../controllers/orderController');
const router = express.Router();

/**
 * @swagger
 * /getorder:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieves an order by its ID along with related service and payment information.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       '200':
 *         description: Successful response with order data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                 pending:
 *                   type: boolean
 *                   description: Indicates whether the order is pending or not
 *                 rated:
 *                   type: boolean
 *                   description: Indicates whether the order has been rated or not
 *       '404':
 *         description: Order not found
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
 * /seller/orders/{id}/cancel:
 *   put:
 *     summary: Cancel and close an order by seller
 *     description: Cancel and close an order by seller and update relevant data such as pending status, timeline, and seller balance.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be cancelled
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order cancelled and closed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /acceptOrder/{id}/close:
 *   put:
 *     summary: Accept and close an order
 *     description: Accept and close an order by the user and update relevant data such as pending status, timeline, seller's completed and ongoing orders, and service's number of customers and reviews.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be accepted and closed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order accepted and closed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /acceptOrder/{id}/close:
 *   put:
 *     summary: Accept and close an order
 *     description: Accept and close an order by the user and update relevant data such as pending status, timeline, seller's completed and ongoing orders, and service's number of customers and reviews.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to be accepted and closed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order accepted and closed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */



router.get("/:id", getOrder);

// router.delete("/:id", deleteOrder);

router.post("/:id/rate", rateOrder);

router.post("/:id/addTimeline", addToOrderTimeline);

router.post("/:id/acceptAndClose", acceptOrderAndClose);

router.post("/:id/cancelAndClose", sellerCancelOrder);

router.post("/:id/addTimeline/done", addToTimelineDone);

module.exports = router;