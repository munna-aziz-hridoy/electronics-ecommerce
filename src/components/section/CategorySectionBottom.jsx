import React from "react";
import { LatestProduct } from "..";

function CategorySectionBottom() {
  return (
    <div className="my-36">
      <h2 className="text-2xl font-bold capitalize text-center my-10">
        New Arrival
      </h2>

      <LatestProduct title={false} />
    </div>
  );
}

export default CategorySectionBottom;
