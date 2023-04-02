import React from "react";

import { Button, Image } from "..";

import { sectionThreeImages } from "@/assets/data/category";

function CatgorySectionThird() {
  return (
    <div className="mx-2 md:mx-32 flex flex-col md:flex-row justify-center items-center bg-[#97d7f5] my-32">
      <div className="w-full md:w-1/2  flex flex-col justify-center items-center gap-3 p-5 h-full py-10 md:py-2">
        <h2 className="text-3xl font-medium text-gray-900">Get Easter Ready</h2>
        <p className="text-lg font-light text-gray-800">
          Bring everyone together with our inspiring gift ideas
        </p>

        <Button>Shop Easter gifts</Button>
      </div>
      <div className="w-full md:w-1/2">
        <Image src={sectionThreeImages[0]} />
      </div>
    </div>
  );
}

export default CatgorySectionThird;
