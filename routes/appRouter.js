const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Seller = require("../models/Seller");
const Service = require("../models/Service");
const Comment = require("../models/Comment");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Discussion = require("../models/Discussion");

router.post("/discussions", async (req, res) => {
  return res.status(500);
});

router.get("/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("service_id").populate('payment');
  const user = await User.findOne({ user_id: req.user });

  if (!order) {
    return res.render("pages/error", { data: "page not found" });
  }

  if (user.user_type === "seller") {
    console.log("in");
    return res.render("pages/viewOrderSeller", {
      order,
      login: true,
      pending: order.pending,
    });
  } else {
    return res.render("pages/viewOrder", {
      order,
      login: true,
      pending: order.pending,
      rated: order.rating,
    });
  }
});

router.post("/order/:id/rate", async (req, res) => {
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
});

router.post("/order/:id/addTimeline", async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findOne({ user_id: req.user });
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
});

router.post("/order/:id/acceptAndClose", async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findOne({ user_id: req.user });
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
});

router.post("/order/:id/addTimeline/done", async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findOne({ user_id: req.user });
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
});

// shhow dashboard
router.get("/profile", async (req, res) => {
  const user = await User.findOne({ user_id: req.user });

  if (req.cookies.admin) {
	  const sellers = await Seller.find();
    const services = await Service.find();
    const users = await User.find();
    const orders = await Order.find();

    const ratings = await Service.find({rating: true});
    console.log(ratings);
    const rating = await Seller.find({rating: {$ne: 0}});
    let r = 0, n=0;
    rating.forEach((p)=>{
      r += p.rating;
      n += 1;
    })
    r = r/n;

    if(ratings.length == 0) {
      r = 0;
    }

  	return res.render("pages/adminDash", { login: true, sellers, services, users, orders, ratings, r });
  }

  if (user.user_type === "seller") {
    const gigs = await Service.find({ seller_id: req.user });
    const seller = await Seller.findOne({ seller_id: req.user });
    const seller_orders = await Order.find({
      seller_id: req.user,
      pending: false,
    }).populate("service_id");
    const ongoing = await Order.find({
      seller_id: req.user,
      pending: true,
    }).populate("service_id");
    return res.render("pages/dash", {
      user,
      seller,
      gigs,
      orders: seller_orders,
      ongoing,
    });
  }

  const orders = await Order.find({
    user_id: req.user,
    pending: false,
  }).populate("service_id");
  const ongoing = await Order.find({
    user_id: req.user,
    pending: true,
  }).populate("service_id");
  console.log(orders);
  res.render("pages/user_dash", { user, orders, ongoing });
});

router.get("/user/edit", async (req, res) => {
  const user = await User.findOne({ user_id: req.user });
  res.render("pages/update_user", { login: true, user });
});

// update user profile
router.post("/user/update", async (req, res) => {
  const user = await User.findOne({ user_id: req.user });

  const obj = req.body;

  if (obj.password.length == 0) {
    user.username = obj.name;
    (user.email = obj.email), (user.user_img = obj.image);
    await user.save();
  } else {
    if (obj.password.length < 7) {
      return res
        .status(400)
        .json({ msg: "password should atleast be 7 characters long!" });
    }

    const passWordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/])[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/]{7,}$/;
    if (!passWordRegex.test(obj.password)) {
      return res.status(400).json({ msg: "password is not strong!" });
    }

    const hashedPassword = await bcrypt.hash(obj.password);
    user.password = hashedPassword;
    user.username = obj.name;
    (user.email = obj.email), (user.user_img = obj.image);
    await user.save();
  }

  return res.status(200).json({ msg: "successfull" });
});

// update seller profile
router.get("/edit", async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ user_id: req.user });
  const seller = await Seller.findOne({ seller_id: req.user });
  console.log("inside edit");
  console.log(seller);
  res.render("pages/update_seller", { user, seller, login: true });
});

router.post("/delete", async (req, res) => {
	console.log(req.user);
	const user = await User.findOne({ user_id: req.user });
	const seller = await Seller.findOne({ seller_id: req.user });

	if(seller && user.user_id === seller.seller_id) {
		try {
			const services = await Service.deleteMany({seller_id: seller.seller_id});
			const order = await Order.find({seller_id: seller.seller_id});
	
			if(order.length > 0) {
				order.forEach(async (o)=>{
					o.pending = false;
					o.timeline.push({
						"title": `This Order has been closed as ${seller.seller_fname} deleted their account!`,
						"desc": 'We are very sorry for the incovenience - your refund will be initiated in a few working days',
						"date": new Date()
					});
					o.user_rating = 0;
					await o.save();
				})
			}
			const u = await User.deleteOne({user_id: req.user});
			const s = await Seller.deleteOne({seller_id: req.user});
			res.clearCookie('user');
			return res.status(200).json({msg: 'deleted successfully'})

		} catch (err) {
			console.log(err);
			return res.status(400).json({msg: 'some error occured'});
		}
	}
	else
	{
		try {
			const order = await Order.find({user_id: user.user_id});
			
			if(order.length > 0) {
				order.forEach(async (o)=>{
					o.pending = false;
					o.timeline.push({
						"title": `This Order has been closed as ${user.username} deleted their account!`,
						"desc": 'We are very sorry for the incovenience!',
						"date": new Date()
					});
					o.user_rating = 5;
					await o.save();
				})
			}
	
			const u = await User.deleteOne({user_id: req.user});
			res.clearCookie('user');
			return res.status(200).json({msg: 'deleted successfully'})
		} catch (err) {
			console.log(err);
			return res.status(400).json({msg: 'some error occured'});
		}
	}
	
	return res.status(200).json({msg: 'user deleted'});
});

// preview gigs
router.get("/product/:id/preview", async (req, res) => {
  const service = await Service.findById(req.params.id);
  const seller = await Seller.findOne({ seller_id: req.user });

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
  const check = await Seller.findOne({ seller_id: req.user });

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
  const seller = await Seller.findOne({ seller_id: req.user });

  if (!seller) {
    return res.render("pages/register_seller", { login: true });
  }

  res.redirect("/app/profile");
});

router.get("/create-gig", (req, res) => {
  res.render("pages/createGig", { login: true });
});

router.post("/create-gig", async (req, res) => {
  const seller = await Seller.findOne({ seller_id: req.user });
  const user = await User.findOne({ user_id: req.user });

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
    seller_id: req.user,
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

router.post("/update_seller", async (req, res) => {
  try {
    console.log(req.body);
    req.body.seller_id = req.cookies.user;
    const obj = { profile: req.body.profile, seller_id: req.body.seller_id };

    const seller = await Seller.findOne({ seller_id: req.user });

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
      { user_id: req.user },
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

  const user = await User.findOne({ user_id: req.user });
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

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("admin");
  res.redirect("/");
});

module.exports = router;
