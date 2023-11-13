import express from 'express';
import { acceptOrderAndClose, addToOrderTimeline, addToTimelineDone, getOrder, rateOrder } from '../controllers/orderController';
const router = express.Router();

router.get("/order/:id", getOrder);

router.delete("/order/:id", deleteOrder);

router.post("/order/:id/rate", rateOrder);

router.post("/order/:id/addTimeline", addToOrderTimeline);

router.post("/order/:id/acceptAndClose", acceptOrderAndClose);

router.post("/order/:id/addTimeline/done", addToTimelineDone);
