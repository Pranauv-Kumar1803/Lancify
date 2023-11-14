import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import api from "./api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/userSlice";

import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from './components/partials/Navbar'
import Footer from "./components/partials/Footer";
import PageNotFound from "./components/auth/PageNotFound";
import Community from "./components/CommunityHub/Community";
import AuthProtected from "./components/partials/AuthProtected";
import Protected from "./components/partials/Protected";
import Dashboard from "./components/Dashboard";


function App() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const getUserData = async () => {
    try {
      const res = await api.get('/auth/check');
      dispatch(loginSuccess(res.data.data))
    } catch (err) {
      console.log(err.response.data)
      nav('/auth/login')
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthProtected />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="/community-hub" element={<Community />} />
        </Route>

        <Route path="/app" element={<Protected />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
