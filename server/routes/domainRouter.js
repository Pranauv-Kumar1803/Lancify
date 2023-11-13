const express = require('express');
const router = express.Router();
const { getServicesOfDomain } = require('../controllers/domainController');

router.get("/:param", getServicesOfDomain);

module.exports = router;