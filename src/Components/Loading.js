import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-6 h-6 rounded-full bg-sky-300 animate-ping"></div>
    </div>
  );
};

export default Loading;
