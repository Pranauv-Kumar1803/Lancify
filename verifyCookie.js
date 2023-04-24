const express = require('express');
const User = require('./models/User');

const verifyCookie = async(req,res,next) => { 
    const cookie = req.cookies.user;
    if(!cookie) {
        return res.render('pages/error',{ data: 'Login First!! Unauthorised page' });
    }
    
    const user = await User.findOne({user_id: cookie}).exec();
    if(!user) {
        return res.render('pages/error',{ data: 'Invalid token!! Login Again!' });
    }
    
    req.user = cookie;
    next();
}

module.exports = verifyCookie