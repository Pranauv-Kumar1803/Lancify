const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/discussions', async (req, res) => {
	return res.status(500);
})


router.get("/profile", (req, res) => {
	if (!req.cookies.user) {
		return res.render('pages/error', { data: 'Please Login to continue to this page' });
	}
	res.render("pages/dash");
});

router.get('/register', (req, res) => {
	if (!req.cookies.user) {
		return res.render('pages/error', { data: 'Please Login to Continue' });
	}
	res.render('pages/register_seller', { login: true });
})

router.get("/create-gig", (req, res) => {
	if (!req.cookies.user) {
		return res.render('pages/error', { data: 'Login to continue' });
	}
	res.render("pages/createGig", { login: true });
});

router.post('/register_seller', async (req, res) => {
	if (!req.cookies.user) {
		return res.render('pages/error', { data: 'Page Not Found' });
	}
	try {
		console.log(req.body);
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
		});
		await result.save();

		const res2 = await User.findOneAndUpdate({ user_id: req.body.seller_id }, { $set: { user_type: 'seller', user_img: obj.profile } }).exec();

		return res.status(201).json(req.body);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'some error occured' });
	}
})


router.get('/logout', (req, res) => {
	res.clearCookie('user');
	res.redirect('/');
})


module.exports = router;