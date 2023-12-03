import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
// import PageLoader from "./Loaders/PageLoader";
import { toast } from "react-toastify";

function AuthProtected() {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        setLoading(true);
        if (user.currentUser) {        
            toast.warning("Already logged In!", {position: "top-right"})
            navigate("/app/dashboard");
        }

        setLoading(false);
    }, []);

    return <Outlet />;
}

export default AuthProtected;
