const express = require("express");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    console.log('inside verifyJWT')
    console.log(req.cookies)
    let tokenUser = req.cookies.user;
    let tokenAdmin = req.cookies.admin;

    console.log(tokenAdmin, tokenUser);

    let flag1 = 0, flag2 = 0;
    if(!tokenUser) flag1 = 1;
    if(!tokenAdmin) flag2 = 1;
    
    if(flag1 && flag2) return res.status(401).json({message: "unauthorised! login again!"}); // no token
    
    if(!flag1)
    {
        jwt.verify(
            tokenUser,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(401).json({message: "unauthorised! login again!"});  //invalid token
                req._id = decoded.id;
                req.type = decoded.type;
                next();
            }
        )
    }
    else
    {
        jwt.verify(
            tokenAdmin,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(401).json({message: "unauthorised! login again!"});  //invalid token
                req._id = decoded.id;
                req.type = decoded.type;
                next();
            }
        )
    }
}

module.exports =  verifyJWT;