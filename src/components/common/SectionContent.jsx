import React from "react";

function SectionContent({
  title,
  subTitle,
  buttonText,
  categories,
  categoryText,
  reverse = false,
}) {
  return (
    <div
      className={`w-full flex flex-col ${
        reverse ? "items-end" : "items-start"
      }`}
    >
      <h2 className="text-xl md:text-4xl font-bold text-white capitalize mb-3">
        {title}
      </h2>
      <p className="text-lg font-light text-slate-200 mb-3">{subTitle}</p>

      <button className="text-black bg-white py-3 px-5 font-semibold rounded-sm shadow-sm">
        {buttonText}
      </button>

      <div className="my-10">
        <p
          className={`text-xs font-medium text-white ${
            reverse ? "text-right" : "text-left"
          }`}
        >
          {categoryText}
        </p>
        <div className="flex items-center gap-3 mt-4">
          {categories.map((item) => (
            <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] relative">
              <img src={item.image.src} className="w-full h-full" />
              <p className="absolute bottom-0 bg-white h-6 sm:h-8 w-full text-center flex justify-center items-center text-gray-900 font-medium">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionContent;
