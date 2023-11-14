import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";

function Protected() {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.currentUser) {
            navigate("/auth/login");
        }
    }, []);

    return <Outlet />;
}

export default Protected;
