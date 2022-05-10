import axios from "axios";
import { Filter } from "../interfaces";

export const axiosFetchProducts = (filter: Filter | undefined) => {
  return axios
    .get(
      "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/products",
      {
        params: filter && {
          brand: filter.brand && filter.brand.name,
          categoryId: filter.categoryId,
          page: filter.page,
          color: filter.color && filter.color.name,
          maxPrice: filter.maxPrice,
          minPrice: filter.minPrice,
        },
      }
    )
    .then((response) => response.data)
    .catch(console.error);
};

export const axiosFetchBrands = () => {
  return axios
    .get(
      "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/brands"
    )
    .then((response) => response.data)
    .catch(console.error);
};

export const axiosFetchColors = () => {
  return axios
    .get(
      "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/colors"
    )
    .then((response) => response.data)
    .catch(console.error);
};

export const axiosFetchCategories = () => {
  return axios
    .get(
      "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment/categories"
    )
    .then((response) => response.data)
    .catch(console.error);
};
