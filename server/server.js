require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const crypto = require("crypto");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");

const Seller = require("./models/Seller");
const User = require("./models/User");
const Service = require("./models/Service");
const Comment = require("./models/Comment");
const Discussion = require("./models/Discussion");

const authRouter = require("./routes/authRouter");
const appRouter = require("./routes/appRouter");
const domainRouter = require("./routes/domainRouter");
const forumRouter = require("./routes/forumRouter");
const orderRouter = require("./routes/orderRouter");
const serviceRouter = require("./routes/serviceRouter");

// const Order = require("./models/Order");
// const Payment = require("./models/Payment");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// middleware
app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.use(express.json({ limit: "3000mb" }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/domains", domainRouter);
app.use("/auth", authRouter);
app.use("/forum", forumRouter);
app.use("/services", serviceRouter);
app.use("/order", verifyJWT, orderRouter);

// protected routes
app.use("/app", verifyJWT, appRouter);

// app.post("/create-checkout-session", verifyCookie, async (req, res) => {
//   const service = JSON.parse(req.body.service);
//   const user = await User.findOne({ user_id: req.user });
//   const seller = await Seller.findOne({ seller_id: service.seller_id });
//   const items = req.body.items;
//   const price = items[0].unit_price.substring(1, items[0].unit_price.length);
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: items.map((item) => {
//         console.log(price);
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.title,
//               description:
//                 "paying : " +
//                 item.name.toUpperCase() +
//                 " for the service type - " +
//                 item.type.toUpperCase(),
//             },
//             unit_amount: price + "00",
//           },
//           quantity: 1,
//         };
//       }),
//       success_url: "http://localhost:5500/success",
//       cancel_url: "http://localhost:5500/cancel",
//     });

//     // console.log(user);

//     const payment = new Payment({
//       method: "card",
//       price: parseInt(price),
//       grand_total: parseInt(price) + 0.01 * parseInt(price),
//       taxes: 0.01 * parseInt(price),
//       seller_id: service.seller_id,
//       user_id: req.user,
//     });

//     await payment.save();

// 		const order = new Order({
// 			domain_type: service.domain_type,
// 			grand_total: payment.grand_total,
// 			pending: true,
// 			service_type: service.service_type,
// 			order_date: new Date(),
// 			payment: payment._id,
// 			seller_id: service.seller_id,
// 			user_id: req.user,
// 			seller_name: service.seller_name,
// 			service_id: service._id,
// 			user_name: user.username,
// 			user_rating: 0,
// 			rating: true,
// 			timeline: [
// 				{
// 					"date": new Date(),
// 					"title": user.username + " : bought this service",
// 					"message": "order successfully bought!"
// 				},
// 				{
// 					"date": new Date(),
// 					"title": service.seller_name + " : received the order",
// 					"message": "order successfully received!"
// 				},
// 			]
// 		})

//     await order.save();

//     seller.balance += parseInt(price);
//     seller.ongoing += 1;
//     await seller.save();

//     res.json({ url: session.url, order: order, payment: payment });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: e.message });
//   }
// });

app.get("/profile/:id", async (req, res) => {
  console.log("in");
  const seller = await Seller.findOne({ seller_id: req.params.id });
  const services = await Service.find({ seller_id: seller.seller_id });
  if (!seller) {
    return res.render("pages/error", { data: "User Not Found" });
  }

  const user = await User.findOne({ user_id: req.params.id });
  console.log(user);

  if (req.cookies.user) {
    return res.render("pages/profile", { login: true, user, seller, services });
  }
  res.render("pages/profile", { login: false, user, seller, services });
});

mongoose.connect(
  "mongodb+srv://lancify:1CeOEWH8wfnKgWVU@cluster0.hripjgl.mongodb.net/Lancify?retryWrites=true&w=majority",
  () => {
    app.listen(5500, () => {
      console.log("connected to mongodb and server started in port 5500");
    });
  }
);
