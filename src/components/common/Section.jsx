import React from "react";

function Section({ reverse, image, color, children }) {
  return (
    <div className="relative">
      <div
        className={`flex ${
          reverse && "flex-row-reverse"
        } justify-center items-stretch min-h-[500px] w-full `}
      >
        <div className={`bg-[${color}] w-[35%] hidden md:block`}></div>
        <div className="w-full md:w-[65%] h-full ">
          <img
            className="object-cover w-full h-[600px] sm:h-full max-h-[95vh]"
            height={500}
            src={image.src}
          />
        </div>
      </div>
      <div className="absolute w-full h-full  top-0 ">
        <div className="container mx-auto flex justify-center items-center h-full p-2">
          <div className="w-full h-full flex items-center">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Section;
