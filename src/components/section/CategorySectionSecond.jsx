import React from "react";

import { sectionTwoImages } from "@/assets/data/category";
import { Button, Image } from "..";

function CategorySectionSecond() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center my-24">
      <div className="flex justify-center items-center gap-4 w-[85%] md:w-[60%] mx-10 md:mx-0 -mt-10 md:mt-0">
        <div className="w-1/2 shadow-xl h-[300px] md:h-[550px]">
          <Image src={sectionTwoImages[0]} />
          <Button className="bg-transparent shadow-none my-5">
            Shop The collection
          </Button>
        </div>
        <div className="w-1/2 shadow-xl h-[300px] md:h-[550px]">
          <Image src={sectionTwoImages[1]} />
          <Button className="bg-transparent shadow-none my-5">
            Create Capsule
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full md:w-[40%] bg-gray-300 shadow -inset-2 p-5 min-h-[400px]">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-3xl font-medium ">M&S Icons</h2>
          <p>Wear-forever foundations for the ultimate capsule wardrobe</p>
          <Button className="bg-transparent shadow-none">Shop Now</Button>
        </div>
      </div>
    </div>
  );
}

export default CategorySectionSecond;
