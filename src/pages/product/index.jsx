import { Container, ProductCard, Spinner } from "@/components";
import useGetSearchProducts from "@/hooks/useGetSearchProducts";
import { useRouter } from "next/router";
import React from "react";

function Products() {
  const { query } = useRouter();

  const { loading, products } = useGetSearchProducts(query?.search);

  return (
    <Container>
      {loading ? (
        <div className="flex justify-center items-center my-28">
          <Spinner />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  my-28">
          {products.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center my-28">
          <p className="text-center">No products found</p>
        </div>
      )}
    </Container>
  );
}

export default Products;
