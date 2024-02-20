const User = require("../models/User");
const Seller = require("../models/Seller");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const Service = require("../models/Service");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkoutsession = async (req, res) => {
  const service = req.body.service;
  const user = await User.findOne({ user_id: req._id });
  const seller = await Seller.findOne({ seller_id: service.seller_id });
  const items = req.body.items;
  console.log(items);
  const price = items[0].unit_price;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        console.log(price);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
              description:
                "paying : " +
                item.name.toUpperCase() +
                " for the service type - " +
                item.type.toUpperCase(),
            },
            unit_amount: price + "00",
          },
          quantity: 1,
        };
      }),
      success_url: `http://localhost:3000/success?s=${service._id}&t=${items[0].tier}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const paymentSuccess = async (req, res) => {
  const q = req.query;
  console.log(q);

  const service = await Service.findById(q.service);
  console.log(service);
  const user = await User.findOne({ user_id: req._id });
  const seller = await Seller.findOne({ seller_id: service.seller_id });
  const items = service.services.find((s) => {
    return s.type.replace('-', ' ') == q.tier.replace('-', ' ');
  });

  console.log(items);
  const price = items.starting_price;

  const payment = new Payment({
    method: "card",
    price: parseInt(price),
    grand_total: parseInt(price) + 0.01 * parseInt(price),
    taxes: 0.01 * parseInt(price),
    seller_id: service.seller_id,
    user_id: req._id,
  });

  await payment.save();

  const order = new Order({
    domain_type: service.domain_type,
    grand_total: payment.grand_total,
    pending: true,
    service_type: service.service_type,
    order_date: new Date(),
    payment: payment._id,
    seller_id: service.seller_id,
    user_id: req._id,
    seller_name: service.seller_name,
    service_id: service._id,
    user_name: user.username,
    user_rating: 0,
    rating: true,
    timeline: [
      {
        date: new Date(),
        title: user.username + " : bought this service",
        message: "order successfully bought!",
      },
      {
        date: new Date(),
        title: service.seller_name + " : received the order",
        message: "order successfully received!",
      },
    ],
  });

  await order.save();

  seller.balance += parseInt(price);
  seller.ongoing += 1;
  await seller.save();

  return res.status(200).json({ order, payment });
};

const sellerAnalytics = async (req, res) => {
  try {
    
    const seller_id = req._id;
    const orders = await Order.find({ seller_id: seller_id }).sort({ rating: -1 }).populate('payment', 'service_id');
  
    const seller = await Seller.findOne({ seller_id: seller_id });
  
    let money = 0;
    let orders_m = [];
  
    let rev = {};
    let rev_by_service = {};
    let rev_by_month = {};
  
    for (let order of orders) {
      console.log(order);
      const cur_month = new Date().getMonth();
  
      const order_month = new Date(order.order_date).getMonth();
      const order_year = new Date(order.order_date).getFullYear();
  
      if (cur_month == order_month) {
        money += order.grand_total;
        if (order.pending) orders_m.push(order);
      }
  
      // revenue by month
      if (order_month in rev_by_month) {
        rev_by_month[order_month] += order.grand_total;
      } else {
        rev_by_month[order_month] = order.grand_total;
      }
  
      rev[order_year] = rev_by_month;
    }
  
    console.log(rev);
  
    for (let order of orders) {
      // revenue by services
      if (String(order.service_id.service_type) in rev_by_service) {
        rev_by_service[String(order.service_id.service_type)] += order.grand_total;
      } else {
        rev_by_service[String(order.service_id.service_type)] = order.grand_total;
      }
    }
  
    console.log(rev_by_service);
  
    console.log('Money earned this month!', money);
    console.log('Orders Received and Working on this month!', money);
    console.log('Total Money Earned thru the platform = Total Balance - ', seller.balance);
  
    // code for avg time taken for completing orders of every service
    const finished = orders.filter((o) => {
      if (o.pending == false) return o;
    })
  
    let pending = orders.length - finished.length;
    let completed = finished.length;
  
    let avgObj = {};
  
    for (let order of finished) {
      console.log(avgObj);
      console.log(order.service_id._id);
      const start = new Date(order.order_date);
      const end = new Date(order.timeline[order.timeline.length - 1].date);
  
      let seconds = (end.getTime() - start.getTime()) / 1000;
  
      if (String(order.service_id._id) in avgObj) {
        let num = avgObj[String(order.service_id._id)][0];
        avgObj[String(order.service_id._id)][0] = num + 1;
        avgObj[String(order.service_id._id)][1] += (seconds / (60 * 60));
      } else {
        avgObj[String(order.service_id._id)] = [1, (seconds / (60 * 60))];
      }
    }
  
    console.log(avgObj);
  
    // most liked services 
    let mostLiked = orders.filter((order) => {
      if (order.user_rating > 0) return order;
    })
  
    let servicesLiked = [];
    for (let liked of mostLiked) {
      const service = await Service.findById(liked.service_id).select({ main_img: 0, seller_img: 0 });
  
      servicesLiked.push(service);
    }
  
    console.log(servicesLiked);
  
    return res.status(200).json({ message: "successsfully got analytics data", servicesLiked, avgObj, newOrders: orders_m.length, pending, completed, this_month_total: money, seller_total: seller.balance, revenueByMonths: rev, revenueByServices: rev_by_service })
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { checkoutsession, paymentSuccess, sellerAnalytics };
