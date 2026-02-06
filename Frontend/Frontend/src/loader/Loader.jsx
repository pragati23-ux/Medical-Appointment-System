import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ color = "#0066cc", height = "100vh", message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-4" style={{ height }}>
      <div className="flex flex-col items-center gap-4">
        <HashLoader color={color} size={50} />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
