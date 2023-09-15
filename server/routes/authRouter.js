const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authControllers');

router.post('/login',authController.loginController);

router.post('/register',authController.registerController);

router.get("/login", async (req, res) => {
    res.render('pages/login');
});

router.get("/register", async (req, res) => {
    res.render('pages/login');
});


module.exports = router;