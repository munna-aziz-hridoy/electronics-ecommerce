import React from "react";

function Section({ reverse = false, image, color, children }) {
  return (
    <div className="relative">
      <div
        className={`flex ${
          reverse && "flex-row-reverse"
        } justify-center items-stretch min-h-[500px] w-full `}
      >
        <div
          style={{ background: `${color}` }}
          className={`w-[35%] hidden md:block`}
        ></div>
        <div className="w-full md:w-[65%] h-full ">
          <img
            className="object-cover w-full h-[600px] sm:h-full max-h-[95vh]"
            height={500}
            src={image.src}
          />
        </div>
      </div>
      <div className="absolute w-full h-full  top-0 ">
        <div className="container mx-auto flex justify-center items-center h-full ">
          <div className="w-full h-full flex items-center p-2 bg-black/25 md:bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
