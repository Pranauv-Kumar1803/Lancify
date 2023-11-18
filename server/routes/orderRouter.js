const express = require('express');
const { acceptOrderAndClose, addToOrderTimeline, addToTimelineDone, getOrder, rateOrder, sellerCancelOrder } = require('../controllers/orderController');
const router = express.Router();

router.get("/:id", getOrder);

// router.delete("/:id", deleteOrder);

router.post("/:id/rate", rateOrder);

router.post("/:id/addTimeline", addToOrderTimeline);

router.post("/:id/acceptAndClose", acceptOrderAndClose);

router.post("/:id/cancelAndClose", sellerCancelOrder);

router.post("/:id/addTimeline/done", addToTimelineDone);

module.exports = router;