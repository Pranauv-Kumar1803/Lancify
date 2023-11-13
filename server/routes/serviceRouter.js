const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

router.get('/', async (req, res)=>{
    const servies = await Service.find();

    return res.status(200).json(services);
})