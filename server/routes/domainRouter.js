const express = require('express');
const router = express.Router();
// const db = require("../sqlite/config");
const Service = require('../models/Service');
const Seller = require('../models/Seller');

router.get('/',(req,res)=>{
    if (!req.cookies.user) {
		return res.render("pages/domains", { login: false });
	}
	res.render('pages/domains',{login:true})
})

router.get("/:param", async (req, res) => {
    let loggedIn = false;
    if (req.cookies.user) {
        loggedIn = true;
    }
    const q = req.query;
    const param = req.params.param;
    const domain = param.split('-')[0];
    const service = param.split('-')[1];

    if(!service)
    {
        if(!req.cookies.user)
        {
            return res.render('pages/domain',{login:false,domain:domain});
        }
        return res.render('pages/domain',{login:true,domain});
    }

    if (JSON.stringify(q) === "{}") {
        try {
            if (!domain) {
                return res.status(301).redirect('/');
            }
            const services = await Service.find({ service_type: service, domain_type: domain }).exec();
            res.render('pages/new_categories', { data: services, loggedIn });
        } catch (err) {
            console.log(err);
            res.render('pages/error', { data: 'Server Error' });
        }
    }
    else {
        try {
            if (!domain) {
                return res.status(301).json({ message: 'invalid domain' });
            }

            console.log(q);
            let services = [];

            if (q.hours) {
                services = await Service.find({ service_type: service, domain_type: domain, min_duration: { $lte: q.hours }, starting_price: { $gte: q.min, $lte: q.max } }).exec();

                console.log(services);
            }
            else {
                services = await Service.find({ service_type: service, domain_type: domain, starting_price: { $gte: q.min, $lte: q.max } }).exec();
                
                console.log(services);
            }

            res.render('pages/new_categories', { data: services, loggedIn });
        } catch (err) {
            console.log(err);
            res.render('pages/error', { data: 'Server Error' });
        }
    }
});


module.exports = router;