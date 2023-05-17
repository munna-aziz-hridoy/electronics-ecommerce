import React from "react";
import { useRouter } from "next/router";

import {
  Container,
  CategorySectionTop,
  CategorySectionSecond,
  CategorySectionThird,
  CategorySectionBottom,
} from "@/components";

import { subMenu } from "@/assets/data/menu";

function Category() {
  const { query, push } = useRouter();

  return (
    <Container>
      {/* top */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-light capitalize my-5">
          {query?.category?.split("_")[0]}
        </h2>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {subMenu.map((item, i) => (
            <div
              onClick={() => push(`/c/${query.category}/${item.name}`)}
              key={i}
              className="flex flex-col justify-center items-center gap-3 cursor-pointer"
            >
              <img
                src={item.image.src}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
              />
              <p className="text-sm font-semibold text-gray-800 capitalize">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* section one */}

      <CategorySectionTop />

      <CategorySectionSecond />

      <CategorySectionThird />

      <CategorySectionBottom />
    </Container>
  );
}

export default Category;
