import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import Home from "./components/Home";
import Something from "./components/Something";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from './components/Navbar'
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>

        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="something" element={<Something />} />
        </Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
