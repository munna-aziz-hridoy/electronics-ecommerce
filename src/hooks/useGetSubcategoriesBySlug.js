import { useState, useEffect } from "react";

const useGetSubcategoriesBySlug = (slug) => {
  const [subCategories, setSubCategories] = useState([]);
  const [parent, setParent] = useState([]);
  const [parentCategory, setParentCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/category/null`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else return [];
      })
      .then((data) => {
        setParent(data);
      });
  }, []);

  useEffect(() => {
    const parentCategory = parent?.find((item) => item.slug === slug);
    setParentCategory(parentCategory);
  }, [slug]);

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
  }, [parentCategory, slug]);

  return {
    loading,
    subCategories,
  };
};

export default useGetSubcategoriesBySlug;
