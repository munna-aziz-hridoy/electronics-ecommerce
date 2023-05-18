import React from "react";

function Image({ src, className }) {
  return (
    <img src={src?.src} className={`w-full h-full object-cover ${className}`} />
  );
}

export default Image;
