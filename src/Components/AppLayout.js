import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import authService from "../appwrite/authService";
import { login, logout } from "../Utils/userSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout);
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="bg-gray-800 overflow-x-hidden scrollbar-none sm:scrollbar">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
