const express = require('express');

const verifyCookie = async(req,res,next) => { 
    const cookie = req.cookies.user;
    if(!cookie) {
        return res.render('pages/error',{ data: 'Login First!! Unauthorised page' });
    }
    req.user = cookie;
    next();
}

module.exports = verifyCookie