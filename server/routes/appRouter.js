const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const router = express.Router();

const User = require("../models/User");
const Seller = require("../models/Seller");
const Service = require("../models/Service");
const Comment = require("../models/Comment");
const Order = require("../models/Order");
const Discussion = require("../models/Discussion");
const verifyJWT = require("../middleware/verifyJWT");
const {
  checkoutsession,
  paymentSuccess,
} = require("../controllers/appController");

router.post("/discussions", async (req, res) => {
  return res.status(500);
});

router.post("/create-checkout-session", checkoutsession);

router.post("/payment-success", paymentSuccess);

router.get("/getProfileData", async (req, res) => {
  console.log(req.query, req._id);
  const user = await User.findOne({ user_id: req._id });
  console.log("inside getProfileData");

  if (req.query.type == "admin") {
    const sellers = await Seller.find();
    const services = await Service.find();
    const users = await User.find();
    const orders = await Order.find();

    const ratings = await Service.find({ rating: true });
    // console.log(ratings);
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

  if (req.query.type === "seller") {
    console.log(req._id);
    const gigs = await Service.find({ seller_id: req._id });
    const seller = await Seller.findOne({ seller_id: req._id });
    const seller_orders = await Order.find({
      seller_id: req._id,
      pending: false,
    }).populate("service_id");

    const ongoing = await Order.find({
      seller_id: req._id,
      pending: true,
    }).populate("service_id");

    return res.json({
      user,
      seller,
      gigs,
      orders: seller_orders,
      ongoing,
    });
  }

  const orders = await Order.find({
    user_id: req._id,
    pending: false,
  }).populate("service_id");

  const ongoing = await Order.find({
    user_id: req._id,
    pending: true,
  }).populate("service_id");
  // console.log(orders);

  return res.json({ user, orders, ongoing });
});

// preview gigs
router.get("/product/:id/preview", async (req, res) => {
  const service = await Service.findById(req.params.id);
  const seller = await Seller.findOne({ seller_id: req._id });

  if (!service) {
    return res.render("pages/error", { data: "page not found" });
  }

  res.render("pages/previewGig", { login: true, service, seller });
});

router.get("/product/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.render("pages/error", { data: "page not found" });
  }

  const seller = await Seller.findOne({ seller_id: service.seller_id });
  const check = await Seller.findOne({ seller_id: req._id });

  if (check) {
    console.log(check);
    if (check.seller_id !== seller.seller_id) {
      console.log("inside");
      return res.render("pages/product", {
        login: true,
        service,
        seller,
        check,
      });
    } else {
      console.log("in");
      return res.render("pages/previewGig", { login: true, service, seller });
    }
  } else {
    console.log("outside");
    return res.render("pages/product", {
      login: true,
      service,
      seller,
      check: undefined,
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
});

router.get("/register", async (req, res) => {
  const seller = await Seller.findOne({ seller_id: req._id });

  if (!seller) {
    return res.render("pages/register_seller", { login: true });
  }

  res.redirect("/app/profile");
});

router.get("/create-gig", (req, res) => {
  res.render("pages/createGig", { login: true });
});

router.post("/create-gig", async (req, res) => {
  const seller = await Seller.findOne({ seller_id: req._id });
  const user = await User.findOne({ user_id: req._id });

  if (!seller) {
    return res.status(400).json({ msg: "seller not found" });
  }

  console.log("in");

  const obj = req.body;
  const p = obj.sub.split("-")[1];
  let type = "";
  switch (p) {
    case "web_dev":
      type = "Web Developer";
      break;
    case "app_dev":
      type = "App Developer";
      break;
    case "web_design":
      type = "Web Designer";
      break;
    case "logo_design":
      type = "Logo Designer";
      break;
    case "blogs_articles":
      type = "Blog and Article Writer";
      break;
    case "resume_cover":
      type = "Resume Cover Builder";
      break;
    case "video_editing":
      type = "Video Editor";
      break;
    case "animation":
      type = "Animator";
      break;
    case "seo":
      type = "SEO Specialist";
      break;
    case "social_marketing":
      type = "Social Media Manager";
      break;

    default:
      type = "none";
      break;
  }

  const ser1 = obj.details1.split(",");
  const serv1 = ser1.map((s) => {
    return s.trim();
  });

  const ser2 = obj.details2.split(",");
  const serv2 = ser2.map((s) => {
    return s.trim();
  });

  const ser3 = obj.details3.split(",");
  const serv3 = ser3.map((s) => {
    return s.trim();
  });

  const o = {
    domain_type: obj.sub.split("-")[0],
    service_type: obj.sub.split("-")[1],
    main_img: obj.image,
    seller_desc: obj.desc,
    seller_id: req._id,
    seller_name: seller.seller_fname,
    seller_title: obj.title,
    seller_img: user.user_img,
    seller_type: type,
    min_duration: obj.delivery1,
    starting_price: obj.price1,
    services: [
      {
        type: "tier-1",
        starting_price: obj.price1,
        min_duration: obj.delivery1,
        services: serv1,
      },
      {
        type: "tier 2",
        starting_price: obj.price2,
        min_duration: obj.delivery2,
        services: serv2,
      },
      {
        type: "tier 3",
        starting_price: obj.price3,
        min_duration: obj.delivery3,
        services: serv3,
      },
    ],
  };

  console.log(o);

  try {
    const newService = new Service(o);

    await newService.save();

    return res.status(201).json({ msg: "gig added successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "some error occurred" });
  }
});

router.post("/register_seller", async (req, res) => {
  try {
    console.log(req.body);
    req.body.seller_id = req.cookies.user;
    const obj = { profile: req.body.profile, seller_id: req.body.seller_id };

    const result = await new Seller({
      seller_id: req.body.seller_id,
      seller_fname: req.body.fname,
      seller_lname: req.body.lname,
      seller_desc: req.body.desc,
      seller_from: new Date(),
      occupation: req.body.occupation,
      country: req.body.country,
      institute: req.body.inst_name,
      degree_title: req.body.title,
      degree_major: req.body.major,
      year_education: req.body.year,
      portfolio_website: req.body.portfolio,
      github: req.body.github,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      languages: req.body.languages,
      certificates: req.body.certificates,
      completed: 0,
      numberRating: 0,
      rating: 0,
      ongoing: 0,
    });
    await result.save();

    console.log(result);
    console.log(obj);

    const data = await User.findOne({ user_id: req.body.seller_id });
    console.log(data);

    const res2 = await User.findOneAndUpdate(
      { user_id: req._id },
      { $set: { user_type: "seller", user_img: obj.profile.value } }
    ).exec();

    return res.status(201).json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "some error occured" });
  }
});

router.post("/update_seller", async (req, res) => {
  try {
    console.log(req.body);
    req.body.seller_id = req.cookies.user;
    const obj = { profile: req.body.profile, seller_id: req.body.seller_id };

    const seller = await Seller.findOne({ seller_id: req._id });

    if (!seller) {
      return res.status(404).json({ msg: "user not found" });
    }

    seller.seller_fname = req.body.fname;
    seller.seller_lname = req.body.lname;
    seller.seller_desc = req.body.desc;
    seller.occupation = req.body.occupation;
    seller.country = req.body.country;
    seller.institute = req.body.institute_name;
    seller.degree_title = req.body.title;
    seller.degree_major = req.body.major;
    seller.year_education = req.body.year;
    seller.portfolio_website = req.body.portfolio;
    seller.github = req.body.github;
    seller.StackOverflow = req.body.stack;
    seller.linkedin = req.body.linkedin;

    seller.languages.concat(req.body.languages);
    seller.certificates.concat(req.body.certificates);

    await seller.save();

    const res2 = await User.findOneAndUpdate(
      { user_id: req._id },
      { $set: { user_img: obj.profile } }
    ).exec();

    return res.status(201).json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "some error occured" });
  }
});

router.post("/register_seller", async (req, res) => {
  try {
    console.log(req.body);
    req.body.seller_id = req.cookies.user;
    const obj = { profile: req.body.profile, seller_id: req.body.seller_id };

    const result = await new Seller({
      seller_id: req.body.seller_id,
      seller_fname: req.body.fname,
      seller_lname: req.body.lname,
      seller_desc: req.body.desc,
      seller_from: new Date(),
      occupation: req.body.occupation,
      country: req.body.country,
      institute: req.body.institute_name,
      degree_title: req.body.title,
      degree_major: req.body.major,
      year_education: req.body.year,
      portfolio_website: req.body.portfolio,
      github: req.body.github,
      StackOverflow: req.body.stack,
      linkedin: req.body.linkedin,
      languages: req.body.languages,
      certificates: req.body.certificates,
      completed: 0,
      numberRating: 0,
      rating: 0,
      ongoing: 0,
    });
    await result.save();

    const res2 = await User.findOneAndUpdate(
      { user_id: req.body.seller_id },
      { $set: { user_type: "seller", user_img: obj.profile } }
    ).exec();

    return res.status(201).json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "some error occured" });
  }
});

router.post("/discussions/:id/addComment", async (req, res) => {
  const comment = req.body;

  const user = await User.findOne({ user_id: req._id });
  const discussion = await Discussion.findById(req.params.id);

  try {
    const id = crypto.randomUUID();
    const newComment = new Comment({
      comment: comment.message,
      forum: discussion.forum,
      comment_id: id,
      user_img: user.user_img,
      user_name: user.username,
      time: new Date(),
    });

    await newComment.save();

    discussion.comments.push(newComment._id);
    await discussion.save();

    return res.status(200).json({ msg: "added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "some error occured" });
  }
});

module.exports = router;
