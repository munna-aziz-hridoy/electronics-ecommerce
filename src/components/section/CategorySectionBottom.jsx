import React from "react";
import { ProductCard } from "..";
import { products } from "@/assets/data/products";

function CategorySectionBottom() {
  return (
    <div className="my-36">
      <h2 className="text-2xl font-bold capitalize text-center my-10">
        New Arrival
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-3">
        {products.slice(0, 4).map((item, i) => (
          <ProductCard key={i} product={item} />
        ))}
      </div>
    </div>
  );
}

export default CategorySectionBottom;
