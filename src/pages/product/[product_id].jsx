import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Container, ProductCard, SignMeUp } from "@/components";
import { products } from "@/assets/data/products";
import { AiOutlineHeart } from "react-icons/ai";

function ProductDetails() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { query } = useRouter();

  useEffect(() => {
    const product = products.find(
      (item) => item.id === parseFloat(query.product_id)
    );

    if (product) {
      setSelectedProduct(product);
    }
  }, [query]);

  console.log(selectedProduct);

  return (
    <Container>
      {!selectedProduct ? (
        <p>Loading</p>
      ) : (
        <div className="px-1 md:px-10">
          <div className="flex flex-col md:flex-row justify-center items-start gap-10 mt-10 mb-16">
            <div className=" w-full md:w-1/2">
              <div className="w-full sm:w-[80%] md:w-[90%] lg:w-[500px]  bg-gray-300">
                <img className="w-full" src={selectedProduct.image.src} />
              </div>
              <div className="flex flex-wrap gap-3 h-28 max-w-full w-full  my-4">
                {[1, 2, 3, 4].map((item) => (
                  <img
                    className="h-full w-[20%] "
                    key={item}
                    src={selectedProduct.image.src}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2  p-3">
              <h2 className="text-3xl font-bold text-gray-700 capitalize">
                {selectedProduct.name}
              </h2>
              <p className="text-lg font-semibold text-green-700 mt-1">
                Price: {selectedProduct.price}
              </p>
              <p className="text-sm text-gray-500 pr-3 my-3">
                {selectedProduct.short_description}
              </p>

              <div class="flex flex-col gap-3 flex-wrap mt-8">
                <div class="flex items-center mr-4">
                  <input
                    id="red-radio"
                    type="radio"
                    value=""
                    name="colored-radio"
                    class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="red-radio"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Product only
                  </label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="green-radio"
                    type="radio"
                    value=""
                    name="colored-radio"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="green-radio"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    With cover
                  </label>
                </div>
              </div>

              <div className="flex justify-center items-center gap-5 mt-8">
                <button className="flex justify-center items-center text-center w-[90%] h-14 my-5">
                  <span className="w-full h-full p-2 bg-[#BDD755] text-gray-800 hover:bg-white text-center flex justify-center items-center font-semibold border-2 border-white hover:border-[#BDD755] duration-150">
                    Add to cart
                  </span>
                </button>
                <button className="w-14 h-14 flex justify-center items-center border-2 border-[#BDD755] text-gray-500 hover:text-gray-700 rounded-sm hover:bg-[#BDD755] duration-150">
                  <AiOutlineHeart fontSize={28} />
                </button>
              </div>
            </div>
          </div>

          {/* part second */}

          <div className="my-14 w-full  bg-white p-2 md:p-8 border-2 border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-700 my-5">
              Description:
            </h2>
            <p className="text-sm text-gray-500 pr-4 ">
              {selectedProduct.long_description}
            </p>
          </div>

          {/* related products */}

          <div className="my-14">
            <h2 className="text-center text-2xl font-semibold text-gray-700 mt-10 mb-5">
              Related Products
            </h2>

            <div className="flex items-center justify-center gap-12 flex-wrap">
              {products.slice(0, 3).map((item) => (
                <div className="max-w-[280px]">
                  <ProductCard product={item} sub />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SignMeUp class_name={"my-16"} />
    </Container>
  );
}

export default ProductDetails;
