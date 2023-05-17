import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export type OptionType = { value: string; label: string };
type OptionsCategoriesType = OptionType[];

const useGetCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://the-trivia-api.com/v2/categories")
      .then((response) => setCategories(response.data));
  }, []);

  const optionsCategory: OptionsCategoriesType = Object.values(categories)
    .flatMap((category) => category)
    .map((category) => ({
      value: category,
      label:
        category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " "),
    }));

  return optionsCategory;
};

export default useGetCategories;
