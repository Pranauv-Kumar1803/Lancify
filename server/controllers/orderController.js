const express = require('express');
const Order = require('../models/Order');
const Seller = require('../models/Seller');
const User = require('../models/User');
const Service = require('../models/Service');
const Payment = require('../models/Payment');
const client = require('../helpers/redis');

const getOrder = async (req, res) => {
    try {
        // redis
        client.get(req.params.id, async (err, cache_data) => {
            if (err) console.log(err);
            if (cache_data) {
                const user = await User.findOne({ user_id: req._id });

                const data = JSON.parse(cache_data);

                if(user.user_type == "seller") {
                    return res.status(200).json({
                        message: `Retrieved ${req.params.id}'s data from the cache`,
                        ...data["seller"]
                    })
                } else {
                    return res.status(200).json({
                        message: `Retrieved ${req.params.id}'s data from the cache`,
                        ...data["user"]
                    })
                }
            } else {
                const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
                const user = await User.findOne({ user_id: req._id });

                if (!order) {
                    return res.status(404).json({ message: "order not found" });
                }

                const obj = {
                    "user": {
                        order,
                        pending: order.pending,
                        rated: order.rating,
                    },
                    "seller": {
                        order,
                        pending: order.pending,
                    }
                }

                client.set(req.params.id, JSON.stringify(obj), "EX", 1000);

                if (user.user_type === "seller") {
                    console.log("in");
                    return res.status(200).json({
                        order,
                        pending: order.pending,
                    });
                } else {
                    return res.status(200).json({
                        order,
                        pending: order.pending,
                        rated: order.rating,
                    });
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
        });
    }
}

const deleteOrder = async (req, res) => {
    const { order, payment } = req.body;

    const o = await Order.findByIdAndDelete(order._id);
    const p = await Payment.findByIdAndDelete(payment._id);

    console.log(o, p);
    return res.status(200).json({ msg: 'deleted successfully' });
}

const rateOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const seller = await Seller.findOne({ seller_id: order.seller_id });

    const { rating } = req.body;
    if (!rating) return res.status(400).json({ msg: "rating not found" });

    try {
        console.log(seller);
        let n = seller.numberRating;
        let r = seller.rating;
        n += 1;
        r += parseInt(rating);
        r = r / n;

        console.log(r);

        seller.rating = r;
        seller.numberRating = n;

        await seller.save();

        order.rating = true;
        order.user_rating = seller.rating;
        await order.save();

        return res.status(200).json({ msg: "success" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error" });
    }
}

const addToOrderTimeline = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const user = await User.findOne({ user_id: req._id });
    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        const { title, message, files, one_time } = req.body;
        const d = new Date();
        console.log("in");

        if (one_time) {
            order.timeline[order.timeline.length - 1].one_time = false;
        }

        if (files && files.length > 0) {
            order.timeline.push({
                title: `${user.username} : ${title}`,
                message,
                date: d,
                files: files,
            });
        } else {
            order.timeline.push({
                title: `${user.username} : ${title}`,
                message,
                date: d,
            });
        }

        await order.save();

        return res.status(201).json({ msg: "successfully added" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const addToTimelineDone = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const user = await User.findOne({ user_id: req._id });
    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        const { title, message, one_time } = req.body;
        console.log(req.body);
        const d = new Date();
        console.log("in");

        order.timeline.push({
            title: `${user.username} : ${title}`,
            message,
            date: d,
            one_time
        });

        await order.save();

        return res.status(201).json({ msg: "successfully added" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const acceptOrderAndClose = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const user = await User.findOne({ user_id: req._id });
    const seller = await Seller.findOne({ seller_id: order.seller_id });
    const service = await Service.findOne({ seller_id: order.seller_id });

    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        order.pending = false;

        let d = new Date();
        order.timeline.push({
            title: `This Order has been accepted and closed by ${user.username}`,
            date: d,
        });
        order.rating = false;
        await order.save();

        seller.completed += 1;
        seller.ongoing -= 1;
        await seller.save();

        service.numCustomers += 1;
        service.numReviews += 1;

        await service.save();
        return res.status(200).json({ msg: "successfuly closed" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const sellerCancelOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const seller = await Seller.findOne({ seller_id: req._id });
    const service = await Service.findOne({ seller_id: seller.seller_id });
    const user = await User.findOne({ user_id: order.user_id });

    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        order.pending = false;

        let d = new Date();
        order.timeline.push({
            title: `This Order has been cancelled and closed by ${seller.seller_fname}`,
            date: d,
        });

        order.cancelled = true;
        await order.save();

        seller.balance -= order.payment.price;
        seller.ongoing -= 1;
        await seller.save();

        await service.save();
        return res.status(200).json({ msg: "successfuly cancelled and closed" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { getOrder, deleteOrder, rateOrder, addToOrderTimeline, addToTimelineDone, acceptOrderAndClose, sellerCancelOrder }