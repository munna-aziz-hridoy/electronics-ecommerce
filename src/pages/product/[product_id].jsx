import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Container, ProductCard, SignMeUp, Spinner } from "@/components";
import { products } from "@/assets/data/products";
import { AiOutlineHeart } from "react-icons/ai";
import { getSingleProduct } from "@/allApis/ProductApis";
import { CartContext } from "@/context/cart";

function ProductDetails() {
  const { query } = useRouter();

  const [selectedVariant, setSelectedVariant] = useState([]);

  const { data, isLoading } = getSingleProduct(query?.product_id);

  const [selectedImage, setSelectedImage] = useState("");
  const [imagesArr, setImagesArr] = useState([]);

  useEffect(() => {
    if (selectedVariant?.length > 0) {
      let lastVariant;
      if (selectedVariant?.length > 1) {
        lastVariant = selectedVariant[selectedVariant.length - 1];
      } else {
        lastVariant = selectedVariant[0];
      }

      setImagesArr(lastVariant?.images);
    } else {
      setImagesArr(data?.images);
    }
  }, [data, selectedVariant]);

  useEffect(() => {
    if (imagesArr?.length > 0) {
      setSelectedImage(imagesArr[0]);
    } else {
      setSelectedImage(data?.images[0]);
    }
  }, [imagesArr, data]);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const { name, images, price, id } = data;

    const variantPrices = selectedVariant?.map((vr) => {
      return parseFloat(((vr.price / 100) * price).toFixed(2));
    });

    const totalVariantPrice = variantPrices?.reduce((a, b) => a + b, 0);

    const cartData = {
      id,
      name,
      image: images[0],
      price: (price + totalVariantPrice).toFixed(2),
      variant: selectedVariant,
    };

    addToCart(cartData);
  };

  console.log(selectedVariant);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : data ? (
        <div className='px-1 md:px-10'>
          <div className='flex flex-col md:flex-row justify-center items-start gap-10 mt-10 mb-16'>
            <div className=' w-full md:w-1/2'>
              <div className='w-full sm:w-[80%] md:w-[90%] lg:w-[500px]  bg-gray-300 h-[550px]'>
                <img className='w-full h-full' src={selectedImage} />
              </div>
              <div className='flex flex-wrap gap-3 h-28 max-w-full w-full  my-4'>
                {imagesArr?.map((item) => (
                  <img
                    onClick={() => setSelectedImage(item)}
                    className='h-28 w-28 cursor-pointer border-2 border-gray-300'
                    key={item}
                    src={item}
                  />
                ))}
              </div>
            </div>
            <div className='w-full md:w-1/2  p-3'>
              <h2 className='text-3xl font-bold text-gray-700 capitalize'>
                {data?.name}
              </h2>
              <p className='text-lg font-semibold text-green-700 mt-1'>
                Price: £{data?.price}
              </p>
              <p className='text-sm text-gray-500 pr-3 my-3'>
                {data?.short_description}
              </p>

              {/* <div className="flex flex-col gap-3 flex-wrap mt-8">
                {data?.extras?.map((item, i) => {
                  const current_variant = selectedVariant?.find(
                    (v) => v?._id === item?._id
                  );

                  return (
                    <div className="flex items-center mr-4">
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedVariant((prev) => {
                              return [...prev, { ...item }];
                            });
                          } else {
                            setSelectedVariant((prev) => {
                              const restItems = prev?.filter(
                                (p) => p._id !== item?._id
                              );
                              return restItems;
                            });
                          }
                        }}
                        id={`green-radio-${i}`}
                        type="checkbox"
                        defaultValue=""
                        checked={current_variant}
                        name="colored-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`green-radio-${i}`}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {item?.variant_name} ({item?.variant_value})
                        <span className="text-base ml-4 font-semibold inline-block text-green-700">
                          Price: ${data?.price} + {item?.price}%
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div> */}

              <div className='flex justify-center items-center gap-5 mt-8'>
                <button
                  onClick={handleAddToCart}
                  className='flex justify-center items-center text-center w-[90%] h-14 my-5'
                >
                  <span className='w-full h-full p-2 bg-[#BDD755] text-gray-800 hover:bg-white text-center flex justify-center items-center font-semibold border-2 border-white hover:border-[#BDD755] duration-150'>
                    Add to cart
                  </span>
                </button>
                <button className='w-14 h-14 flex justify-center items-center border-2 border-[#BDD755] text-gray-500 hover:text-gray-700 rounded-sm hover:bg-[#BDD755] duration-150'>
                  <AiOutlineHeart fontSize={28} />
                </button>
              </div>
            </div>
          </div>

          {/* part second */}

          <div className='my-14 w-full  bg-white p-2 md:p-8 border-2 border-gray-100'>
            <h2 className='text-2xl font-semibold text-gray-700 my-5'>
              Description:
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className='text-sm text-gray-500 pr-4 '
            ></div>
          </div>

          {/* related products */}

          <div className='my-14'>
            <h2 className='text-center text-2xl font-semibold text-gray-700 mt-10 mb-5'>
              Related Products
            </h2>

            <div className='flex items-center justify-center gap-12 flex-wrap'>
              {products.slice(0, 3).map((item) => (
                <div className='max-w-[280px]'>
                  <ProductCard product={item} sub />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No data Found</p>
      )}

      <SignMeUp class_name={'my-16'} />
    </Container>
  )
}

export default ProductDetails;
