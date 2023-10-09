import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-full shadow-lg rounded-lg bg-white cursor-pointer h-80">
      <div className="rounded-t-lg w-full bg-gray-400 h-3/4"></div>
      <div className="py-2 px-3 space-y-2">
        <h1 className="p-3 bg-gray-400 rounded-md"></h1>
        <p className="p-3 bg-gray-400 rounded-md"></p>
      </div>
    </div>
  );
};

export default ShimmerCard;
