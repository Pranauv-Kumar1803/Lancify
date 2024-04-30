const express = require('express');
const router = express.Router();
const { getServicesOfDomain, getServices } = require('../controllers/domainController');

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Get services
 *     description: |
 *       Retrieves services based on query parameters such as hours, minimum and maximum prices.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *         description: Filter services by minimum duration in hours
 *       - in: query
 *         name: min
 *         schema:
 *           type: integer
 *         description: Filter services by minimum starting price
 *       - in: query
 *         name: max
 *         schema:
 *           type: integer
 *         description: Filter services by maximum starting price
 *     responses:
 *       '200':
 *         description: Successful response with services data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
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



router.get("/", getServices);

router.get("/:param", getServicesOfDomain);

module.exports = router;