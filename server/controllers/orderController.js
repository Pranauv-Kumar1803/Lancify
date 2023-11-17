const express = require('express');
const Order = require('../models/Order');
const Seller = require('../models/Seller');
const User = require('../models/User');
const Service = require('../models/Service');
const Payment = require('../models/Payment');

const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
    const user = await User.findOne({ user_id: req._id });

    console.log()

    if (!order) {
        return res.status(404).json({ message: "order not found" });
    }

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

const deleteOrder = async (req, res) => {
    const { order, payment } = req.body;

    const o = await Order.findByIdAndDelete(order._id);
    const p = await Payment.findByIdAndDelete(payment._id);

    console.log(o, p);
    return res.status(200).json({ msg: 'deleted successfully' });
}

const rateOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("service_id");
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
    const order = await Order.findById(req.params.id);
    const user = await User.findOne({ user_id: req._id });
    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        const { title, message, files } = req.body;
        const d = new Date();
        console.log("in");
        if (files.length > 0) {
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
    const order = await Order.findById(req.params.id);
    const user = await User.findOne({ user_id: req._id });
    if (!order) {
        return res.status(404).json({ msg: "order not found" });
    }

    try {
        const { title, message } = req.body;
        const d = new Date();
        console.log("in");

        order.timeline.push({
            title: `${user.username} ${title}`,
            message,
            date: d,
        });

        await order.save();

        return res.status(201).json({ msg: "successfully added" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
}

const acceptOrderAndClose = async (req, res) => {
    const order = await Order.findById(req.params.id);
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

module.exports = { getOrder, deleteOrder, rateOrder, addToOrderTimeline, addToTimelineDone, acceptOrderAndClose }