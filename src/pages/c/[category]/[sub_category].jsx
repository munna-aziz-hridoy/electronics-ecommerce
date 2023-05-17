import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

import { products as demo_products } from "@/assets/data/products";
import { Container, ProductCard, SignMeUp } from "@/components";
import SubCategoryHeader from "@/components/common/SubCategoryHeader";
import { data } from "../../../assets/data/SubCategoryHeaderCardData";
import { serverUrl } from "@config/index";

function SubCategory() {
  const [products, setProducts] = useState([]);

  const { query } = useRouter();

  useEffect(() => {
    fetch(`${serverUrl}/api/category/product?category=${query.sub_category}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else return [];
      })
      .then((data) => {
        setProducts(data);
      });
  }, [query]);

  return (
    <Container>
      <div className="my-10">
        <h2 className="text-2xl font-light capitalize my-5 text-center flex justify-center items-center gap-10">
          {query?.category?.split("_")[0]} <BsArrowRight />{" "}
          {query?.sub_category?.split("_")[0]}
        </h2>

        {/* Sub_Category_Header */}
        <SubCategoryHeader data={data} />

        {/* product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  my-28">
          {products.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </div>
        {/* Sing Me Up Box */}
        <SignMeUp />
      </div>
    </Container>
  );
}

export default SubCategory;
