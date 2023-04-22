const express = require('express');
const User = require('../models/User');

const loginController = async(req,res)=>{
    const email = req.body.email;
	const password = req.body.password;
	try {
		const user = await User.findOne({email:email}).exec();
        console.log(user)
		if (user) {
			if (password !== user.password) {
				return res.status(400).json({ message: "password not matching" });
			} else {
                console.log('in')
				res.cookie('user', user.user_id, {
					maxAge: 60 * 60 * 1000
				});
				return res.status(200).json(user);
			}
		} else {
			return res.status(404).json({ message: "user not found" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err.message });
	}
}

const registerController = async(req,res)=>{
    const name = req.body?.name;
	const email = req.body?.email;
	const password = req.body?.password;
	const uuid = crypto.randomUUID();

	const obj = { name, email, password, uuid };
	console.log(obj);

	try {
		const user = await User.findOne({email:email}).exec();

		if (!user) {
			const r = await new User({
				email : obj.email,
				password : obj.password,
				user_img : null,
				username : obj.name,
				user_id : obj.uuid,
				user_type : null
			})

			await r.save();
			return res
				.status(201)
				.json({ message: "sign up successful", data: r.data });
		} else {
			return res.status(401).json({ error: "user already exists" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err.message });
	}
}

module.exports = {loginController,registerController};