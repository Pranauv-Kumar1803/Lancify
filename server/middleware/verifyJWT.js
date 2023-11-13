import express from "express";
import jwt from "jsonwebtoken"

const verifyJWT = (req, res, next) => {
    console.log("verifyJwt");
    let tokenUser = req.cookies.user;
    let tokenAdmin = req.cookies.admin;

    let flag1 = 0, flag2 = 0;
    if(!tokenUser) flag1 = 1;
    if(!tokenAdmin) flag2 = 1;
    
    if(flag1 && flag2) return res.status(401).json({message: "unauthorised! login again!"}); // no token

    if(!flag1)
    {
        jwt.verify(
            token,
            String(process.env.ACCESS_TOKEN_SECRET),
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
            token,
            String(process.env.ACCESS_TOKEN_SECRET),
            (err, decoded) => {
                if (err) return res.status(401).json({message: "unauthorised! login again!"});  //invalid token
                req._id = decoded.id;
                req.type = decoded.type;
                next();
            }
        )
    }
}

export default verifyJWT;