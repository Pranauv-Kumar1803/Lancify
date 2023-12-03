import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "./api/axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "./features/userSlice";
import Loader from "./components/Loader/Loader";
import Main from "./components/Main";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/check");
      console.log(res.data);
      dispatch(loginSuccess(res.data.data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return loading ? <Loader /> : <Main />;
}

export default App;
