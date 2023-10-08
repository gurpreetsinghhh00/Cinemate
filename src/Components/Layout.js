import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-800 overflow-x-hidden">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
