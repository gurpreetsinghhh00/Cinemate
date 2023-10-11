import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AuthLayout = ({ children, authentication = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.user.status);

  useEffect(() => {
    setIsLoading(true);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate, authentication, authStatus]);

  return isLoading ? <Loading /> : <>{children}</>;
};

export default AuthLayout;
