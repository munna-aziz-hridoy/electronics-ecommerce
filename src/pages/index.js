import React from "react";
import { Section } from "@/components";

import sectionImg from "../assets/section-bg-1.png";

import { homeData } from "../assets/data/home";

function Home() {
  return (
    <div className="">
      <Section color="#25627c" image={sectionImg}>
        <div className=" w-full">
          <h2 className="text-xl md:text-4xl font-bold text-white capitalize mb-3">
            spring looks
          </h2>
          <p className="text-lg font-light text-slate-200 mb-3">
            Make the season anything but <br /> ordinary
          </p>

          <button className="text-black bg-white py-3 px-5 font-semibold rounded-sm shadow-sm">
            Shop new in
          </button>

          <div className="my-10">
            <p className="text-xs font-medium text-white">More of whats new</p>
            <div className="flex items-center gap-3 mt-4">
              {homeData.section_one.categories.map((item) => (
                <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] relative">
                  <img src={item.image.src} className="w-full h-full" />
                  <p className="absolute bottom-0 bg-white h-6 sm:h-8 w-full text-center flex justify-center items-center">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Home;
