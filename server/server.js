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
const Order = require("./models/Order");

const authRouter = require("./routes/authRouter");
const appRouter = require("./routes/appRouter");
const domainRouter = require("./routes/domainRouter");
const forumRouter = require("./routes/forumRouter");
const orderRouter = require("./routes/orderRouter");
const serviceRouter = require("./routes/serviceRouter");
const { paymentSuccess } = require("./controllers/appController");

// const Order = require("./models/Order");
// const Payment = require("./models/Payment");

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

// other methods
app.get("/admin/analytics", async (req, res) => {
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
});

app.get("/profile/:id", async (req, res) => {
  console.log("in");
  const seller = await Seller.findOne({ seller_id: req.params.id });
  const services = await Service.find({ seller_id: seller.seller_id });
  if (!seller) {
    return res.render("pages/error", { data: "User Not Found" });
  }

  const user = await User.findOne({ user_id: req.params.id });
  console.log(user);

  if (req._id.user) {
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
