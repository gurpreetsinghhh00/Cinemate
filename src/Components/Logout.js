import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { logout as storeLogout } from "../Utils/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(storeLogout());
    });

    navigate("/");
  };

  return <NavLink onClick={handleLogout}>Logout</NavLink>;
};

export default Logout;
