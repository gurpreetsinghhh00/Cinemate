import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const { status, statusText } = error;
  return (
    <div className="flex justify-center items-center h-screen font-nunito font-bold bg-gray-800 text-white">
      <div className="gap-1">
        <h1>Oops!!</h1>
        <h2>Something went wrong</h2>
        <h3>{status + ": " + statusText}</h3>
        <h3>Please check your network connection</h3>
      </div>
    </div>
  );
};

export default Error;
