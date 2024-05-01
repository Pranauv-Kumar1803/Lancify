const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Order = require("../models/Order");
const Service = require("../models/Service");
const client = require("../helpers/redis");

const loginController = async (req, res) => {
  console.log(req.body);

  const email = req.body.data.email;
  const password = req.body.data.password;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (email === process.env.ADMIN_EMAIL) {
      const token = jwt.sign(
        { id: user.user_id, type: "admin" },
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          expiresIn: "2h",
        }
      );
      res.cookie("admin", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(user);
    }

    const token = jwt.sign(
      { id: user.user_id, type: "user" },
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: "2h",
      }
    );
    res.cookie("user", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const registerController = async (req, res) => {
  console.log("inside register user");
  const name = req.body?.name;
  const email = req.body?.email;
  const password = req.body?.password;
  const uuid = crypto.randomUUID();

  const obj = { name, email, password, uuid };

  console.log("inside this ", obj);

  const newPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOne({ email: email }).exec();
    console.log(user);
    if (user) return res.status(401).json({ error: "user already exists" });

    const img =
      "data:image/png;base64,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";
    const r = await new User({
      email: obj.email,
      password: newPassword,
      user_img: img,
      username: obj.name,
      user_id: obj.uuid,
      user_type: null,
    });

    await r.save();
    return res
      .status(201)
      .json({ message: "sign up successful", data: r.data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkUser = async (req, res) => {
  console.log("inside check function");
  if (!req._id) return res.status(401).json({ message: "Unauthorized!" });

  try {
    // redis
    client.get(req._id, async (err, ca_data) => {
      if (err) return res.status(500);

      if (ca_data) {
        return res.status(200).json(JSON.parse(ca_data));
      } else {
        const data = await User.findOne({ user_id: req._id }, { password: 0 });

        client.set(req._id, JSON.stringify({data, type: req.type}), "EX", 1000);

        return res.status(200).json({ data, type: req.type });
      }
    })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  console.log(req._id);
  const user = await User.findOne({ user_id: req._id });
  const seller = await Seller.findOne({ seller_id: req._id });

  if (seller && user.user_id === seller.seller_id) {
    try {
      const services = await Service.deleteMany({
        seller_id: seller.seller_id,
      });
      const order = await Order.find({ seller_id: seller.seller_id });

      if (order.length > 0) {
        order.forEach(async (o) => {
          o.pending = false;
          o.timeline.push({
            title: `This Order has been closed as ${seller.seller_fname} deleted their account!`,
            desc:
              "We are very sorry for the incovenience - your refund will be initiated in a few working days",
            date: new Date(),
          });
          o.user_rating = 0;
          await o.save();
        });
      }
      const u = await User.deleteOne({ user_id: req._id });
      const s = await Seller.deleteOne({ seller_id: req._id });
      res.clearCookie("user");
      return res.status(200).json({ msg: "deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "some error occured" });
    }
  } else {
    try {
      const order = await Order.find({ user_id: user.user_id });

      if (order.length > 0) {
        order.forEach(async (o) => {
          o.pending = false;
          o.timeline.push({
            title: `This Order has been closed as ${user.username} deleted their account!`,
            desc: "We are very sorry for the incovenience!",
            date: new Date(),
          });
          o.user_rating = 5;
          await o.save();
        });
      }

      const u = await User.deleteOne({ user_id: req._id });
      res.clearCookie("user");
      return res.status(200).json({ msg: "deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "some error occured" });
    }
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({ user_id: req._id });

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
};

const getUserDetails = async (req, res) => {
  console.log(req._id);
  const user = await User.findOne({ user_id: req._id });
  const seller = await Seller.findOne({ seller_id: req._id });
  console.log("inside edit");
  console.log(seller);
  return res.status(200).json({ user, seller });
};

const logout = (req, res) => {
  console.log("inside logout");
  res.clearCookie("user");
  res.clearCookie("admin");
  return res.status(200).json({ message: "logout successful" });
};

module.exports = {
  loginController,
  registerController,
  checkUser,
  getUserDetails,
  updateUser,
  deleteUser,
  logout,
};
