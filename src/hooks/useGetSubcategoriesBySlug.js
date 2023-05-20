import { useState, useEffect } from "react";
import { getCategory } from "@/allApis";
import { serverUrl } from "@config/index";

const useGetSubcategoriesBySlug = (slug) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: parent } = getCategory();

  const parentCategory = parent?.find((item) => item.slug === slug);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/category/${parentCategory?.id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else return [];
      })
      .then((data) => {
        setSubCategories(data);
        setLoading(false);
      });
  }, [parentCategory]);

  return {
    loading,
    subCategories,
  };
};

export default useGetSubcategoriesBySlug;
