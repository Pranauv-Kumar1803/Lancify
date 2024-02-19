require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const crypto = require("crypto");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");
const multer = require('multer');

mongoose.set('strictQuery', true);
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
app.use('/admin', verifyJWT, adminRouter);

// protected routes
app.use("/app", verifyJWT, appRouter);

const DIR = './public/images/multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, String(new Date().getTime()) + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// other methods

//  the new post - create gig form.... its there in appRouter if you want more info... its the same - just copy pasted... 
app.post('/postGig', upload.single('image'), async(req, res)=>{
  console.log(JSON.parse(req.body.data), typeof JSON.parse(req.body.data));
  console.log(req.file);

  const seller = await Seller.findOne({ seller_id: req._id });
  const user = await User.findOne({ user_id: req._id });

  if (!seller) {
    return res.status(400).json({ msg: "seller not found" });
  }

  console.log("in");

//   // {
//   title: 'gig1',
//   tier1Price: '1000',
//   tier1Services: 'servcies',
//   tier2Price: '2000',
//   tier2Services: 'serveirces',
//   tier3Price: '3000',
//   tier3Services: 'afsefsf'
// }

  const obj = JSON.parse(req.body.data);
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

  const ser1 = obj.tier1services.split(",");
  const serv1 = ser1.map((s) => {
    return s.trim();
  });

  const ser2 = obj.tier2services.split(",");
  const serv2 = ser2.map((s) => {
    return s.trim();
  });

  const ser3 = obj.tier3services.split(",");
  const serv3 = ser3.map((s) => {
    return s.trim();
  });

  const o = {
    domain_type: obj.sub.split("-")[0],
    service_type: obj.sub.split("-")[1],
    main_img: obj.main_img,
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
})

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
