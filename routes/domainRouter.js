const express = require('express');
const router = express.Router();
const db = require("../sqlite/config");

router.get("/:param", async (req, res) => {
    let loggedIn = false;
    if(req.cookies.user)
    {
        loggedIn=true;
    }
    const q = req.query;
    const param = req.params.param;
    const domain = param.split('-')[0];
    const service = param.split('-')[1];

    if (JSON.stringify(q) === "{}") {
        try {
            if (!domain) {
                return res.status(301).redirect('/');
            }
            const services = await db.getDomainBasedService({domain:domain,service:service});

            res.render('new_categories', { data: services.data,loggedIn });

        } catch (err) {
            console.log(err);
            res.render('error', { data: 'Server Error' });
        }
    }
    else {
        try {
            if (!domain) {
                return res.status(301).json({ message: 'invalid domain' });
            }
            const services = await db.getServiceBasedOnQuery({ domain: domain, query: q });
            res.render('new_categories', { data: services.data,loggedIn });
        } catch (err) {
            console.log(err);
            res.render('error', { data: 'Server Error' });
        }
    }
});


module.exports = router;