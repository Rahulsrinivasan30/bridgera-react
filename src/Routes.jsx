import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";

const Nav = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default Nav;
