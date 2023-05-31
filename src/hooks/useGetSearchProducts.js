import { useEffect, useState } from "react";

const useGetSearchProducts = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/product?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [searchTerm]);

  return { products, loading };
};

export default useGetSearchProducts;
