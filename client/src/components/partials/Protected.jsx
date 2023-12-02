import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader'

function Protected() {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log(user);
        if (!user.currentUser) {
            console.log('inside this!')
            navigate("/auth/login");
        }
        setLoading(false);
    }, []);

    return loading ? <Loader /> : <Outlet />
}

export default Protected;
