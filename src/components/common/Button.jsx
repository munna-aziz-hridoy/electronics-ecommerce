import React from "react";
import { BsArrowRight } from "react-icons/bs";

function Button({ children, onClick, className }) {
  return (
    <span
      onClick={onClick}
      className={`px-5 py-2 cursor-pointer bg-white rounded-sm shadow text-gray-900 text-lg font-medium flex justify-center items-center gap-4 ${className}`}
    >
      {children}
      <BsArrowRight />
    </span>
  )
}

export default Button;
