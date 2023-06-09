import { useState, useEffect } from "react";
import { serverUrl } from "@config/index";

const useGetSubcategoriesById = (id) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/category/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else return [];
      })
      .then((data) => {
        setLoading(false);

        setData(data);
      });
  }, [id]);

  return {
    data,
    loading,
  };
};

export default useGetSubcategoriesById;
