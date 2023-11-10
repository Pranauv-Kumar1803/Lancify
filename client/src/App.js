import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Something from "./components/Something";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
