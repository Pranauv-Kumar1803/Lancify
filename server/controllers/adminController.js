const Service = require("../models/Service");
const Order = require("../models/Order");
const Seller = require("../models/Seller");
const User = require("../models/User");

const getServiceToBeApproved = async (req, res) => {
    const serviceId = req.params.serviceId;
    try {
        const service = await Service.findById(serviceId, { isAdminApproved: false }).populate("seller_id");
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({
            message: "error",
        });
    }
};

const getServicesToBeApproved = async (req, res) => {
    try {
        const service = await Service.find({ isAdminApproved: false });
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({
            message: "error",
        });
    }
};

const approveServices = async (req, res) => {
    const { ids } = req.body;

    for (let id of ids) {
        const service = await Service.findById(id);

        if (!service) return res.status(404).json({ message: 'Service not found' });

        service.isAdminApproved = true;
        await service.save();
    }

    return res.status(200).json({ message: 'successfully approved!' });
}

// have to change this analytics part -- siddharth pls do it!!
const analytics = async (req, res) => {
    const sellers = await Seller.find();
    const services = await Service.find();
    const users = await User.find();
    const orders = await Order.find();

    const ratings = await Service.find({ rating: true });
    console.log(ratings);
    const rating = await Seller.find({ rating: { $ne: 0 } });
    let r = 0,
        n = 0;
    rating.forEach((p) => {
        r += p.rating;
        n += 1;
    });
    r = r / n;

    if (ratings.length == 0) {
        r = 0;
    }

    return res.json({ sellers, services, users, orders, ratings, r });
}


module.exports = {getServiceToBeApproved, getServicesToBeApproved, analytics, approveServices};