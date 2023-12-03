const express = require('express');
const router = express.Router();
const { getServicesOfDomain, getServices } = require('../controllers/domainController');

router.get("/", getServices);

router.get("/:param", getServicesOfDomain);

module.exports = router;