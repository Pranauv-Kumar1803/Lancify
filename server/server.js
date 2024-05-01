require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const rfs = require("rotating-file-stream");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const crypto = require("crypto");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const multer = require("multer");
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
const adminRouter = require("./routes/adminRouter");
const csrf = require("csurf");

const app = express();
const logDirectory = path.join(__dirname, "logs");

const { connectRedis, client } = require("./helpers/redis");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream("appLogs.log", {
  interval: "1d",
  path: logDirectory,
});
app.use(morgan("combined", { stream: accessLogStream }));

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

const crsfProtection = csrf({
  cookie: true,
});

// routes
app.use("/domains", domainRouter);
app.use("/auth", authRouter);
app.use("/forum", forumRouter);
app.use("/services", serviceRouter);
app.use("/order", verifyJWT, orderRouter);
app.use("/admin", verifyJWT, adminRouter);

// protected routes
app.use("/app", verifyJWT, appRouter);

const DIR = "./public/images/multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, String(new Date().getTime()) + "-" + fileName);
  },
});

var upload = multer({
  limits: { fieldSize: 2 * 1024 * 1024 },
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// other methods

//  the new post - create gig form.... its there in appRouter if you want more info... its the same - just copy pasted...
app.post("/postGig", upload.single("image"), verifyJWT, async (req, res) => {
  console.log(JSON.parse(req.body.data), typeof JSON.parse(req.body.data));
  console.log(req.file);

  const seller = await Seller.findOne({ seller_id: req._id });
  const user = await User.findOne({ user_id: req._id });

  if (!seller) {
    return res.status(400).json({ msg: "seller not found" });
  }

  console.log("in");

  const obj = JSON.parse(req.body.data);
  const p = obj["sub-category"].split("-")[1];
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

  const ser1 = obj.tier1Services.split(",");
  const serv1 = ser1.map((s) => {
    return s.trim();
  });

  const ser2 = obj.tier2Services.split(",");
  const serv2 = ser2.map((s) => {
    return s.trim();
  });

  const ser3 = obj.tier3Services.split(",");
  const serv3 = ser3.map((s) => {
    return s.trim();
  });

  const o = {
    domain_type: obj["sub-category"].split("-")[0],
    service_type: obj["sub-category"].split("-")[1],
    main_img: obj.main_img,
    seller_desc: obj.desc,
    seller_id: req._id,
    seller_name: seller.seller_fname,
    seller_title: obj.title,
    seller_img: user.user_img,
    seller_type: type,
    min_duration: obj.tier1duration,
    starting_price: obj.tier1Price,
    services: [
      {
        type: "tier-1",
        starting_price: obj.tier1Price,
        min_duration: obj.tier1duration,
        services: serv1,
      },
      {
        type: "tier 2",
        starting_price: obj.tier2Price,
        min_duration: obj.tier2duration,
        services: serv2,
      },
      {
        type: "tier 3",
        starting_price: obj.tier3Price,
        min_duration: obj.tier3duration,
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

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Error here!");
});

// comment this once testing is done
// mongoose.connect(
//   "mongodb+srv://lancify:1CeOEWH8wfnKgWVU@cluster0.hripjgl.mongodb.net/Lancify?retryWrites=true&w=majority",
//   () => {
//     app.listen(5500, () => {
//       console.log("connected to mongodb and server started in port 5500");
//     });
//   }
// );

module.exports = app;
